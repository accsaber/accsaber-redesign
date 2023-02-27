import { ActionFunction, redirect } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import invariant from "tiny-invariant";
import { user } from "~/lib/cookies";

export const action: ActionFunction = async ({ request }) => {
  if (request.method.toLowerCase() !== "post")
    throw new Response("Only POST requests are allowed", { status: 400 });
  const cookieHeader = request.headers.get("Cookie");
  const userCookie: { userId?: string; dark?: boolean } =
    (await user.parse(cookieHeader)) || {};

  const fd = await request.formData();
  const theme = fd.get("theme");

  invariant(theme, "Expected theme");

  return redirect(request.headers.get("referer") ?? `/`, {
    headers: {
      "set-cookie": await user.serialize(
        { ...userCookie, dark: theme === "dark" },
        {
          maxAge: 31536000,
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        }
      ),
    },
  });
};
