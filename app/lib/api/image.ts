import ms from "ms";
import sharp from "sharp";
import { client } from "./fetcher";

const getImage = async (url: string, width: number) => {
  if (!client.isOpen) await client.connect();
  const cachedImage = await client.get(`accsaber:image:${url}:webp:${width}`);

  if (cachedImage) {
    const [timestamp, image] = cachedImage.split("|");
    console.log(timestamp);
    if (Date.now() - parseInt(timestamp) < 86400000)
      return new Response(Buffer.from(image, "base64"), {
        headers: {
          "content-type": "image/webp",
          "cache-control": "public, max-age=604800",
          "fly-cache-status": "HIT",
        },
      });
  }

  const imageData = new Uint8Array(await (await fetch(url)).arrayBuffer());
  const converted = await sharp(imageData).resize(width).webp().toBuffer();
  await client.set(
    `accsaber:image:${url}:webp:${width}`,
    new Date().getTime() + "|" + converted.toString("base64")
  );

  return new Response(converted, {
    headers: {
      "content-type": "image/webp",
      "cache-control": "public, max-age=604800",
      "fly-cache-status": "MISS",
    },
  });
};

export default getImage;
