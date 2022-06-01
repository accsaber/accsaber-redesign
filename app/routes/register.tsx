import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { user } from "~/cookies";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const profile = formData.get("profile");
  if (typeof profile !== "string")
    return json({ error: "Missing ScoreSaber profile" });

  let url: URL;

  try {
    url = new URL(profile);
  } catch (err) {
    return json({ error: "Invalid profile url" });
  }

  if (url.host !== "scoresaber.com")
    return json({ error: `Invalid profile url hostname: ${url.hostname}` });

  const parsedUrl = /^\/u\/([0-9]+)$/.exec(url.pathname);
  if (!parsedUrl) return json({ error: url.pathname });

  const computedProfile = parsedUrl[1];

  const userCookie = await user.serialize({ userId: computedProfile });

  return redirect(`/profile/${computedProfile}`, {
    headers: {
      "Set-Cookie": userCookie,
    },
  });
};

const RegisterPage: React.FC = () => {
  const { error } = useActionData() ?? {};
  return (
    <Form className="flex mx-auto flex-col max-w-md gap-4 p-6" method="post">
      <pre>{JSON.stringify(error)}</pre>
      <input
        type="url"
        name="profile"
        className="p-2 px-3 rounded border-2"
        placeholder="ScoreSaber profile"
        required
      />
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded shadow-blue-500/50 shadow-lg flex items-center justify-center"
      >
        Log In
      </button>
    </Form>
  );
};

export default RegisterPage;
