import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = ({ request }) => {
  const u = new URL(request.url);
  u.pathname = "/leaderboards/overall";
  return Response.redirect(u, 301);
};
