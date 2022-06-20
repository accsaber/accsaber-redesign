import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { user } from "~/cookies";
import apiFetcher from "~/lib/api/fetcher";

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

  const { data: scoresaberProfile, status } = await apiFetcher.get<{
    id: string;
    name: string;
  }>(`https://scoresaber.com/api/player/${parsedUrl[1]}/basic`);

  if (status !== 200) return { error: `Invalid ScoreSaber ID` };

  await apiFetcher.post("players", {
    body: {
      playerName: scoresaberProfile.name,
      scoresaberLink: scoresaberProfile.id,
    },
  });

  const userCookie = await user.serialize({ userId: scoresaberProfile.id });

  return redirect(`/profile/${scoresaberProfile.id}`, {
    headers: {
      "Set-Cookie": userCookie,
    },
  });
};

const RegisterPage: React.FC = () => {
  const { error } = useActionData() ?? {};
  return (
    <Form className="flex mx-auto flex-col max-w-md gap-4 p-6" method="post">
      {error ? (
        <div className="text-red-800 bg-red-300 py-3 px-4 border-red-600 rounded">
          {error}
        </div>
      ) : (
        <></>
      )}
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
