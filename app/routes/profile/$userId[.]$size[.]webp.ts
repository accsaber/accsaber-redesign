import type { LoaderFunction } from "@remix-run/node";
import { AxiosError } from "axios";
import invariant from "tiny-invariant";
import { get } from "~/lib/api/fetcher";
import getImage from "~/lib/api/image";
import type { Player } from "~/lib/interfaces/api/player";

const sizes = new Map([
  ["thumbnail", 80],
  ["avatar", 256],
]);

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.userId, "Expected User ID");
  invariant(params.size, "Expected Size");

  if (!sizes.has(params.size))
    throw new Response("Invalid Size", { status: 400 });

  if (!/^[0-9]{1,17}$/.test(params.userId))
    throw new Response("Player Not Found", { status: 404 });

  try {
    const user = (await get(`/players/${params.userId}`)) as Player;
    invariant(user, "Player not found");

    return getImage(user.avatarUrl, sizes.get(params.size) ?? 80);
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Response(err.message, { status: err.response?.status ?? 500 });
    }
  }
};
