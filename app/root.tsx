import {
  LinksFunction,
  LoaderArgs,
  LoaderFunction,
  MetaFunction,
  defer,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import styles from "~/styles/app.css";
import {
  Links as LinksBlock,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "@remix-run/react";
import { Suspense, useState } from "react";
import Header from "@/Header";
import LoadingSpinner from "@/LoadingSpinner";
import logo from "~/images/logo.webp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getPlayer } from "./lib/api/fetcher";
import { user } from "./lib/cookies";
import type { Player } from "$interfaces/api/player";
import UserContext from "@/UserContext";
import DarkModeContext from "@/DarkModeContext";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "AccSaber",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "shortcut icon", href: logo },
];

export const loader = async ({ request }: LoaderArgs) => {
  const cookieHeader = request.headers.get("Cookie");
  const userCookie: { userId?: string; dark?: boolean } =
    (await user.parse(cookieHeader)) || {};
  const headers = new Headers();

  const currentUser = userCookie.userId ? getPlayer(userCookie.userId) : null;

  return defer(
    {
      user: currentUser,
      dark: userCookie.dark,
    },
    { headers }
  );
};

export default function App() {
  const queryClient = new QueryClient({});
  const { user, dark: darkSetting } = useLoaderData<typeof loader>();
  const [dark, setDarkMode] = useState(darkSetting ?? false);

  return (
    <DarkModeContext.Provider value={{ dark, setDarkMode }}>
      <UserContext.Provider value={(user as Promise<Player>) ?? null}>
        <html lang="en" className="h-full">
          <head>
            <Meta />
            <LinksBlock />
          </head>
          <body
            className={`${
              dark
                ? `dark graphiql-dark bg-neutral-900 text-white`
                : `graphiql-light bg-white text-neutral-900`
            } overflow-auto xl:pl-16`}
          >
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

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <html className="h-full">
      <head>
        <title>Oops!</title>
        <Meta />
        <LinksBlock />
        <link rel="stylesheet" href={styles} />
        <link rel="shortcut icon" href={logo} />
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
                  Looks like you've hit a bad route. If you've clicked a bad
                  link, give one of the devs a shout and they'll look into it{" "}
                  {":)"}
                </p>
              </>
            ) : (
              <p>
                <h1 className="text-red-600 dark:text-red-400">
                  Error loading page
                </h1>
                <p>It looks like something's gone wrong.</p>
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
