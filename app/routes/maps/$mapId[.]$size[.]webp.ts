import type { LoaderFunction } from "@remix-run/node";
import { AxiosError } from "axios";
import invariant from "tiny-invariant";
import { get } from "~/lib/api/fetcher";
import getImage from "~/lib/api/image";
import type { Player } from "~/lib/interfaces/api/player";
import { RankedMap } from "~/lib/interfaces/api/ranked-map";

const sizes = new Map([
  ["thumbnail", 80],
  ["cover", 256],
]);

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.mapId, "Expected Map ID");
  invariant(params.size, "Expected Size");

  if (!sizes.has(params.size))
    throw new Response("Invalid Size", { status: 400 });

  try {
    const map = await get<RankedMap>(`/ranked-maps/${params.mapId}`);
    invariant(map, "Player not found");

    return getImage(
      `https://accsaber.com/cdn/covers/${map.songHash.toUpperCase()}.png`,
      sizes.get(params.size) ?? 80
    );
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Response(err.message, { status: err.response?.status ?? 500 });
    }
  }
};
