import { S3Client } from "s3_lite_client";
import sqliteMemorySync from "outils/sqliteMemorySync.ts";

export const getS3Uri = (key: string) =>
  new URL(key, Deno.env.get("S3_PUBLIC_URL")!);

export const s3Client = new S3Client({
  accessKey: Deno.env.get("S3_ACCESS_KEY_ID")!,
  secretKey: Deno.env.get("S3_SECRET_ACCESS_KEY")!,
  endPoint: Deno.env.get("S3_ENDPOINT_URL")!,
  region: Deno.env.get("S3_BUCKET_REGION")!,
  bucket: Deno.env.get("S3_DEFAULT_BUCKET")!,
  useSSL: true,
  pathStyle: true,
});

const filename = "database.sqlite";
export const database = await sqliteMemorySync(
  () => s3Client.getObject(filename).then((r) => r.arrayBuffer()),
  (buffer) => s3Client.putObject(filename, buffer).then(() => true),
  () => s3Client.statObject(filename).then((r) => r.etag)
);
