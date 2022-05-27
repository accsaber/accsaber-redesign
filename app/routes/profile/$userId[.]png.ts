import { json, LoaderFunction } from "@remix-run/node";
import invariant from "tiny-invariant";
import { get } from "~/lib/api/fetcher";

export const loader: LoaderFunction = ({ params }) => {
  invariant(params.userId, "Expected User ID");
  if (!/^[0-9]{1,17}$/.test(params.userId))
    throw new Response("Player Not Found", { status: 404 });

  return fetch(`https://accsaber-image.fly.dev/profile/${params.userId}.png`);
};
