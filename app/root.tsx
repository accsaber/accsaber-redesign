import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
  useTransition,
} from "@remix-run/react";

import Header from "./lib/components/header";

import styles from "./tailwind.css";
import logo from "./lib/images/logo.png";
import UserContext from "./lib/components/userContext";
import { user } from "./cookies";
import { getPlayer } from "./lib/api/player";
import DarkModeContext from "./lib/components/darkModeContext";
import { useState } from "react";
import type { Player } from "./lib/interfaces/api/player";

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
      ENV: {
        NODE_ENV: process.env.NODE_ENV,
        FLY_REGION: process.env.FLY_REGION,
      },
      user: currentUser,
      dark: userCookie.dark,
    },
    { headers }
  );
};

export const action: ActionFunction = (context) => {
  return {};
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "AccSaber",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "shortcut icon", href: logo },
  ];
}

export default function App() {
  const data = useLoaderData<{
    user?: Player;
    dark?: boolean;
    ENV: { NODE_ENV?: string };
  }>();
  const { state } = useTransition();
  const [dark, setDarkMode] = useState(data.dark ?? false);

  return (
    <DarkModeContext.Provider
      value={{
        dark,
        setDarkMode,
      }}
    >
      <UserContext.Provider value={data.user ?? null}>
        <html lang="en">
          <head>
            <Meta />
            <Links />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.process = {}; window.process.env = ${JSON.stringify(
                  data.ENV
                )}`,
              }}
            />
          </head>
          <body className={`${dark ? "dark bg-neutral-900" : ""} `}>
            <Header />
            <div
              className={`transition-opacity ${
                state !== "idle" ? "opacity-50 [transition-delay:0.25s]" : ""
              }`}
            >
              <Outlet />
            </div>
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </body>
        </html>
      </UserContext.Provider>
    </DarkModeContext.Provider>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <html className="h-full">
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col h-full dark:bg-neutral-900">
        <Header />
        <div className="flex items-center justify-center flex-1 text-4xl">
          <div className="prose prose-xl dark:prose-invert">
            {caught.status == 404 ? (
              <>
                <h1 className="text-orange-600 dark:text-orange-400">
                  404: Page not found
                </h1>
                <p>
                  Looks like you've hit a bad route. This website is a work in
                  progress, so it's likely you've simply clicked a link to
                  something that hasn't been implemented yet. (sorry!)
                </p>
              </>
            ) : (
              <p>
                <h1 className="text-red-600 dark:text-red-400">
                  Error loading page
                </h1>
                <p>It looks like something's gone wrong.</p>
                <p>
                  This website is still in development, and there's likely to be
                  a few things broken
                </p>
                <p>
                  If you've set this off with something obscure, let a dev know
                  and we'll throw it on the pile
                </p>
                <p>
                  If it's something really obvious, please don't, we probably
                  already know {":)"}
                </p>
                <h2>Full error</h2>
                <pre>{caught.data}</pre>
              </p>
            )}
          </div>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
