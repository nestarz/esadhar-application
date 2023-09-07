import type { RouteConfig } from "$fresh/server.ts";
import { s3Client, getS3Uri } from "@/src/utils/database.ts";

const getHash = async (str: string, length = -1) =>
  await crypto.subtle.digest("SHA-1", new TextEncoder().encode(str)).then((d) =>
    [...new Uint8Array(d)]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .slice(0, length)
  );

const getExt = (str: string) => (str.match(/\.([^.]*?)(?=\?|#|$)/) || [])[1];
const SHARP_BASE_VERSION = "20230419";
const getKey = (key: string) => ["sharp", key].join("/");

export const config: RouteConfig = {
  routeOverride: "/api/transformer",
};

export const handler = {
  GET: async (req: Request) => {
    const api = Object.assign(
      new URL("https://remote-sharp.vercel.app/api/transformer"),
      { search: new URL(req.url).searchParams }
    );
    const params = Object.fromEntries(api.searchParams);
    const extText = JSON.parse(api.searchParams.get("toFormat") ?? "null")?.[0];
    const ext = extText ?? getExt(decodeURIComponent(params.url)) ?? "jpg";
    const hash = await getHash(
      JSON.stringify(params, Object.keys(params).sort()) + SHARP_BASE_VERSION
    );
    const fn = [hash, ext].join(".");
    const key = getKey(fn);
    const stat = await s3Client.statObject(key).catch(() => null);
    if (!stat?.etag) {
      const response = await fetch(api);
      const ok = response.status === 200 && response.body;
      const putInfo = ok
        ? await s3Client
            .putObject(key, response.body, {
              partSize: 5 * 1024 * 1024,
              metadata: {
                "Content-Type": response.headers.get("content-type")!,
                "Cache-Control": response.headers.get("cache-control")!,
                "Content-Disposition": response.headers.get(
                  "content-disposition"
                )!,
              },
            })
            .catch(console.error)
        : null;
      if (!ok) return response;
      if (!putInfo) return new Response(null, { status: 500 });
    }

    return Response.redirect(getS3Uri(key), 302);
  },
};
