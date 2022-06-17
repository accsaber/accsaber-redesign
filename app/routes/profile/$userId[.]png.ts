import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getJSON } from "~/lib/api/fetcher";
import type { Player } from "~/lib/interfaces/api/player";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.userId, "Expected User ID");
  if (!/^[0-9]{1,17}$/.test(params.userId))
    throw new Response("Player Not Found", { status: 404 });

  const { avatarUrl } = await getJSON<Player>(`/players/${params.userId}`);

  return Response.redirect(avatarUrl, 301);
};
