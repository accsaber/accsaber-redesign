import { json, LoaderFunction } from "@remix-run/node";
import invariant from "tiny-invariant";
import { get } from "~/lib/api/fetcher";
import { Player } from "~/lib/interfaces/api/player";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.userId, "Expected User ID");
  if (!/^[0-9]{1,17}$/.test(params.userId))
    throw new Response("Player Not Found", { status: 404 });

  const { avatarUrl } = await get<Player>(`/players/${params.userId}`);

  return Response.redirect(avatarUrl, 301);
};
