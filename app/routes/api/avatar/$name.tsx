import type { LoaderArgs } from "@remix-run/cloudflare";
import Avatar from "boring-avatars";
import { renderToString } from "react-dom/server";

export const loader = async ({ request, params: { name } }: LoaderArgs) => {
  const { searchParams } = new URL(request.url);

  const variant = searchParams.get("variant") as Parameters<
    typeof Avatar
  >[0]["variant"];
  return new Response(
    renderToString(
      <Avatar
        name={name ?? "0"}
        square
        variant={variant ?? "beam"}
        size={256}
      />
    ),
    {
      headers: {
        "content-type": "image/svg+xml",
      },
    }
  );
};
