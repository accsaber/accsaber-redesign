import type { LoaderFunction } from "@remix-run/node";
import { AxiosError } from "axios";
import invariant from "tiny-invariant";
import { get } from "~/lib/api/fetcher";
import getImage from "~/lib/api/image";
import type { Player } from "~/lib/interfaces/api/player";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.userId, "Expected User ID");
  if (!/^[0-9]{1,17}$/.test(params.userId))
    throw new Response("Player Not Found", { status: 404 });

  try {
    const user = (await get(`/players/${params.userId}`)) as Player;
    invariant(user, "Player not found");

    return getImage(user.avatarUrl, 256);
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Response(err.message, { status: err.response?.status ?? 500 });
    }
  }
};
