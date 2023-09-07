import "std/dotenv/load.ts";

import createContentManagementSystem from "bureau";
import createGQLite from "gqlite";
import * as Islands from "islet/server";
import createRenderPipe from "outils/createRenderPipe.ts";
import createBasicAuth from "outils/createBasicAuth.ts";
import { middleware } from "outils/fresh/middleware.ts";
import * as staticFileRoute from "outils/staticFileRoute.ts";
import renderToString from "preact-render-to-string";
import prepass from "preact-ssr-prepass";
import { router } from "rutt";
import toReadableStream from "to-readable-stream";

import * as Home from "@/src/routes/Home.tsx";
import * as ApiSharp from "@/src/routes/api/sharp.ts";
import { database, getS3Uri, s3Client } from "@/src/utils/database.ts";
import twindConfig from "@/twind.config.ts";
import { twind, virtual } from "@twind/core";
import TwindStream from "@twind/with-react/readableStream";

const graphql = await createGQLite(database, {
  generateTypeScriptDefinitions: true,
});

const renderPipe = createRenderPipe(
  async (vn) => (await prepass(vn), vn),
  (vn) => "<!DOCTYPE html>".concat(renderToString(vn)),
  (str: string) => new TextEncoder().encode(str),
  toReadableStream,
  Islands.addScripts,
  (stream: ReadableStream) =>
    stream.pipeThrough(new TwindStream(twind(twindConfig, virtual(true))))
);

const route = (module: Parameters<typeof renderPipe>[0]) => ({
  [module.config!.routeOverride!]: middleware(
    createBasicAuth(
      Deno.env.get("BASIC_AUTH_USERNAME")!,
      Deno.env.get("BASIC_AUTH_PASSWORD")!
    )((_req, ctx) => ctx.next()),
    graphql.freshMiddleware,
    renderPipe(module)
  ),
});

await Deno.serve(
  { port: 8025 },
  router({
    "/graphql": graphql.handler,
    "/admin": await createContentManagementSystem({
      s3Client,
      getS3Uri,
      graphqlPath: "/graphql",
      prefix: "/admin"
    }),
    ...[Home, ApiSharp].reduce((acc, module) => ({ ...acc, ...route(module) }), {}),
    [staticFileRoute.config.routeOverride!]: staticFileRoute.createHandler({
      baseUrl: import.meta.url,
    }),
    [Islands.config.routeOverride]: Islands.createHandler({
      jsxImportSource: "preact",
      baseUrl: new URL(import.meta.url),
      prefix: "./islands/",
      importMapFileName: "deno.json",
      esbuildOptions: { minify: false },
    }),
  })
).finished;
