import { ActionFunction, json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { user } from "~/cookies";

export const action: ActionFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const userCookie: { userId?: string; dark?: boolean } =
    (await user.parse(cookieHeader)) || {};

  const fd = await request.formData();
  const theme = fd.get("theme");

  console.log(fd);
  invariant(theme, "Expected theme");

  return json(
    { theme },
    {
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
    }
  );
};
