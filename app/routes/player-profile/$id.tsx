import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

export const loader: LoaderFunction = ({ params }) => {
  invariant(params.id, "expected player id");
  return redirect(`/profile/${params.id}/scores/overall`, 301);
};
