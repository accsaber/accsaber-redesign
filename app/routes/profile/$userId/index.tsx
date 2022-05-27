import { LoaderFunction, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

export const loader: LoaderFunction = ({ params }) => {
  invariant(params.userId, "Expected User ID");
  return redirect(`/profile/${params.userId}/scores`);
};
