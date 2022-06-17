import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

export const loader: LoaderFunction = ({ params }) => {
  invariant(params.userId, "Expected User ID");
  return redirect(`/profile/${params.userId}/overall/scores`);
};
