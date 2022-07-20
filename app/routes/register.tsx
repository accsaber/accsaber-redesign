import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { user } from "~/cookies";
import config from "~/lib/api/config";
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

  if (url.host !== "scoresaber.com" && url.host !== "www.scoresaber.com")
    return json({ error: `Invalid profile url hostname: ${url.hostname}` });

  const parsedUrl = /^\/u\/([0-9]+)$/.exec(url.pathname);
  if (!parsedUrl) return json({ error: url.pathname });

  const { data: scoresaberProfile, status } = await apiFetcher.get<{
    id: string;
    name: string;
  }>(`https://scoresaber.com/api/player/${parsedUrl[1]}/basic`);

  if (status !== 200) return { error: `Invalid ScoreSaber ID` };
  const payload = {
    playerName: scoresaberProfile.name,
    scoresaberLink: scoresaberProfile.id.toString(),
  };

  const res = await fetch(new URL("players", config.apiURL), {
    credentials: "omit",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    referrer: "https://accsaber.com/leaderboard",
    body: JSON.stringify(payload),
    method: "POST",
    mode: "cors",
  });

  const response = new Response(res.body, res);

  const userCookie = await user.serialize({ userId: scoresaberProfile.id });
  response.headers.set("set-cookie", userCookie);

  return response;
};

const RegisterPage: React.FC = () => {
  const data = useActionData() ?? {};
  return (
    <Form className="flex flex-col max-w-md gap-4 p-6 mx-auto" method="post">
      {data.error ?? data.errorCode ? (
        <div className="px-4 py-3 text-red-800 bg-red-200 rounded">
          {data.message ?? data.error}
        </div>
      ) : Object.entries(data).length > 0 ? (
        <div className="px-4 py-3 text-blue-800 bg-blue-200 rounded">
          Signup successful. It may take up to 2 hours for your profile to
          appear on the leaderboards {JSON.stringify(Object.entries(data))}
        </div>
      ) : (
        ""
      )}
      <input
        type="url"
        name="profile"
        className="p-2 px-3 border-2 rounded"
        placeholder="ScoreSaber profile"
        required
      />
      <button
        type="submit"
        className="flex items-center justify-center p-2 text-white bg-blue-500 rounded shadow-lg shadow-blue-500/50"
      >
        Sign Up
      </button>
    </Form>
  );
};

export default RegisterPage;
