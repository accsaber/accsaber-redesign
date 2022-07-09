import type { LoaderFunction } from "@remix-run/node";
import { AxiosError } from "axios";
import invariant from "tiny-invariant";
import getImage from "~/lib/api/image";
import { getMapInfo } from "~/lib/api/map";

const sizes = new Map([
  ["thumbnail", 80],
  ["cover", 256],
]);

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.mapId, "Expected Map ID");
  invariant(params.size, "Expected Size");
  const format = params.format as "jpeg" | "png" | "avif" | "webp";
  invariant(
    ["jpeg", "png", "avif", "webp"].includes(format ?? ""),
    "Invalid or missing format"
  );

  if (!sizes.has(params.size))
    throw new Response("Invalid Size", { status: 400 });

  try {
    const map = await getMapInfo(params.mapId);
    invariant(map, "Map not found");

    return getImage(
      `https://cdn.accsaber.com/covers/${map.songHash.toUpperCase()}.png`,
      sizes.get(params.size) ?? 80,
      format
    );
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Response(err.message, { status: err.response?.status ?? 500 });
    } else throw err;
  }
};
