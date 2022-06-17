import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

export const loader: LoaderFunction = ({ params }) => {
  invariant(params.userId, "Expected User ID");
  invariant(params.category, "Expected Category");
  return redirect(`/profile/${params.userId}/${params.category}/scores`, 301);
};
