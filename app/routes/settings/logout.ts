import { ActionFunction, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { user } from "~/lib/cookies";

export const action: ActionFunction = async ({ params, request }) => {
  if (request.method.toLowerCase() !== "post")
    throw new Response("Only POST requests are allowed", { status: 400 });

  const data = await request.formData();

  const cookieHeader = request.headers.get("Cookie");
  const userCookie: { userId?: string; dark?: boolean } =
    (await user.parse(cookieHeader)) || {};
  const newCookie = await user.serialize(
    { ...userCookie, userId: null },
    {
      maxAge: 31536000,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    }
  );
  console.log(newCookie);
  return redirect(request.headers.get("referer") ?? `/leaderboards/overall`, {
    headers: {
      "set-cookie": newCookie,
    },
  });
};
