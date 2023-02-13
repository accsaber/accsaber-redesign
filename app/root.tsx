import { LoaderFunction, MetaFunction, json } from "@remix-run/node";
import styles from "./__generated__/tailwind.css";
import {
  Links as LinksBlock,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { Suspense, useState } from "react";
import Header from "@/Header";
import { ExclamationIcon } from "@heroicons/react/outline";
import config from "./lib/api/config";
import LoadingSpinner from "@/LoadingSpinner";
import logo from "~/images/logo.webp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getPlayer } from "./lib/api/fetcher";
import { user } from "./lib/cookies";
import { Player } from "$interfaces/api/player";
import UserContext from "@/UserContext";
import DarkModeContext from "@/DarkModeContext";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "AccSaber",
  viewport: "width=device-width,initial-scale=1",
});

interface RootData {
  user?: Player;
  dark?: boolean;
}

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const userCookie: { userId?: string; dark?: boolean } =
    (await user.parse(cookieHeader)) || {};
  const headers = new Headers();

  const currentUser = userCookie.userId
    ? await getPlayer(userCookie.userId)
    : null;

  return json(
    {
      user: currentUser,
      dark: userCookie.dark,
    },
    { headers }
  );
};

export default function App() {
  const queryClient = new QueryClient({});
  const { user, dark: darkSetting } = useLoaderData<RootData>();
  const [dark, setDarkMode] = useState(darkSetting ?? false);
  return (
    <DarkModeContext.Provider value={{ dark, setDarkMode }}>
      <UserContext.Provider value={user ?? null}>
        <html lang="en" className="h-full">
          <head>
            <Meta />
            <LinksBlock />
            <link rel="stylesheet" href={styles} />
            <link rel="shortcut icon" href={logo} />
          </head>
          <body
            className={`${
              dark
                ? "dark bg-neutral-900 text-white"
                : "bg-white text-neutral-900"
            } flex flex-col h-full overflow-auto`}
          >
            {config.isBeta && (
              <div className="bg-red-900 text-white">
                <div className="px-4 py-3 max-w-screen-lg mx-auto flex gap-3 items-center">
                  <div className="rounded bg-black/20 p-2">
                    <ExclamationIcon className="w-6 h-6" />
                  </div>
                  You're looking at a development version of AccSaber. Expect to
                  find broken / unimplemented features.
                </div>
              </div>
            )}
            <Header />
            <QueryClientProvider client={queryClient}>
              <Suspense
                fallback={
                  <>
                    <div className="h-16 bg-neutral-100 dark:bg-neutral-800" />
                    <div className="flex-1 flex items-center justify-center">
                      <LoadingSpinner />
                    </div>
                  </>
                }
              >
                <Outlet />
              </Suspense>
            </QueryClientProvider>
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </body>
        </html>
      </UserContext.Provider>
    </DarkModeContext.Provider>
  );
}
