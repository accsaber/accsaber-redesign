import { json, LoaderFunction } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getJSON } from "~/lib/api/fetcher";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.userId, "Expected User ID");
  if (!/^[0-9]{1,17}$/.test(params.userId))
    throw new Response("Player Not Found", { status: 404 });

  return await getJSON(`/players/${params.userId}/scores`);
};
