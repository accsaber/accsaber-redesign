import ms from "ms";
import { commandOptions } from "redis";
import sharp from "sharp";
import { client } from "./fetcher";

const getImage = async (url: string, width: number) => {
  const headers = new Headers(
    Object.entries({
      "content-type": "image/webp",
      "cache-control": "public, max-age=604800",
    })
  );

  if (!client.isOpen) await client.connect();

  const readStartTime = performance.now();
  const cachedImage = await client.get(
    commandOptions({ isolated: true }),
    `accsaber:image:${url}:webp:${width}`
  );

  headers?.append(
    "server-timing",
    `db;desc="db:${`accsaber:image:${url}:webp:${width}`
      .replace(/\\/g, "\\\\")
      .replace(/\//g, "\\/")}";dur=${performance.now() - readStartTime}`
  );
  if (cachedImage) {
    const [timestamp, image] = cachedImage.split("|");
    if (Date.now() - parseInt(timestamp) < 86400000) {
      headers.set("fly-cache-status", "HIT");
      return new Response(Buffer.from(image, "base64"), {
        headers,
      });
    }
  }

  const fetchStartTime = performance.now();
  const response = await fetch(url);
  const imageData = new Uint8Array(await response.arrayBuffer());
  headers?.append(
    "server-timing",
    `fetch;desc="fetch:${url
      .replace(/\\/g, "\\\\")
      .replace(/\//g, "\\/")}";dur=${performance.now() - fetchStartTime}`
  );

  const conversionStartTime = performance.now();
  const converted = await sharp(imageData).resize(width).webp().toBuffer();
  headers?.append(
    "server-timing",
    `convert;desc="convert:${response.headers.get("content-type")}:webp";dur=${
      performance.now() - conversionStartTime
    }`
  );
  await client.set(
    `accsaber:image:${url}:webp:${width}`,
    new Date().getTime() + "|" + converted.toString("base64")
  );

  return new Response(converted, {
    headers,
  });
};

export default getImage;
