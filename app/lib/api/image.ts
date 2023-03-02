import { commandOptions } from "redis";
import sharp from "sharp";
import { client } from "./fetcher";

const getImage = async (
  url: string,
  width: number,
  format: "webp" | "png" | "jpeg" = "webp"
) => {
  const headers = new Headers(
    Object.entries({
      "content-type": `image/${format}`,
      "cache-control": "public, max-age=604800",
      "x-content-type-options": "nosniff",
    })
  );

  const baseKey = `accsaber:image:${url}`;
  const key = `${baseKey}:${width}`;

  const readStartTime = performance.now();
  const cachedImage = await client.hGet(
    commandOptions({ returnBuffers: true }),
    key,
    format
  );

  headers?.append(
    "server-timing",
    `db;desc="db:${key.replace(/\\/g, "\\\\").replace(/\//g, "\\/")}";dur=${
      performance.now() - readStartTime
    }`
  );
  if (cachedImage) {
    return new Response(cachedImage, {
      headers,
    });
  }

  const fetchStartTime = performance.now();

  let baseImage: Buffer | null = await client.get(
    commandOptions({ returnBuffers: true }),
    `${baseKey}:raw`
  );

  if (!baseImage) {
    baseImage = Buffer.from(await (await fetch(url)).arrayBuffer());
    await client.set(`${baseKey}:raw`, baseImage);
    await client.expire(`${baseKey}:raw`, 86400);
  }

  const imageData = new Uint8Array(baseImage);
  headers?.append(
    "server-timing",
    `fetch;desc="fetch:${url
      .replace(/\\/g, "\\\\")
      .replace(/\//g, "\\/")}";dur=${performance.now() - fetchStartTime}`
  );

  const converted = await sharp(imageData).resize(width)[format]().toBuffer();

  await client.hSet(key, format, converted);
  await client.expire(key, 86400);

  return new Response(converted, {
    headers,
  });
};

export default getImage;
