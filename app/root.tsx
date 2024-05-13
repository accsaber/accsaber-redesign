import { captureRemixErrorBoundaryError } from "@sentry/remix";
import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { defer } from "@remix-run/node";
import { json } from "@remix-run/node";
import styles from "~/styles/app.css";
import {
  Links as LinksBlock,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useCatch,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { Suspense, useState } from "react";
import Header from "@/Header";
import LoadingSpinner from "@/LoadingSpinner";
import logo from "~/images/logo.webp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { user } from "./lib/cookies";
import type { Player } from "$interfaces/api/player";
import UserContext from "@/UserContext";
import DarkModeContext from "@/DarkModeContext";
import { gqlClient } from "./lib/api/gql";
import { UserContextDocument } from "$gql";
import { withTiming } from "./lib/timing";
import { useNonce } from "@/NonceContext";
import { getDSN } from "./lib/api/config";

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

  const currentUser = userCookie.userId
    ? gqlClient
        .request(UserContextDocument, { playerId: userCookie.userId })
        .then(withTiming(headers, "playerData", "Get current user info"))
        .then((p) => p.playerDatum)
    : Promise.resolve(null);

  return json(
    {
      user: await currentUser,
      dark: userCookie.dark,
      dsn: getDSN(),
    },
    { headers }
  );
};

export const ErrorBoundary = () => {
  const error = useRouteError();

  const nonce = useNonce();
  if (!isRouteErrorResponse(error)) {
    return <div>Something went wrong</div>;
  }
  if (error.status !== 404) captureRemixErrorBoundaryError(error);

  return (
    <html lang="en">
      <head>
        <title>{`${error.statusText} | AccSaber`}</title>
        <Meta />
        <LinksBlock />
      </head>
      <body>
        <Header hideUser />
        <div className="p-6 py-16 prose prose-lg dark:prose-invert max-w-screen-lg mx-auto">
          {error.status === 404 ? (
            <>
              <h1 className="font-semibold text-orange-600 dark:text-orange-400">
                Page not found
              </h1>
              <p>Either you've followed a dead link or entered a URL wrong</p>
              <p>
                If this page was linked to from AccSaber, please tell us in the
                #bug-reports channel on discord
              </p>
            </>
          ) : (
            <>
              <h1 className="font-semibold text-orange-600 dark:text-orange-400">
                {error.statusText}
              </h1>
              <p>Something went wrong and we couldn't load this page.</p>
              <p>
                We have automatic error logging in place, but if this happens
                repeatedly please leave instructions to reproduce it in the
                #bug-reports channel on discord
              </p>
            </>
          )}
        </div>

        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
        <LiveReload />
      </body>
    </html>
  );
};

export default function App() {
  const queryClient = new QueryClient({});
  const { user, dark: darkSetting, dsn } = useLoaderData<typeof loader>();
  const [dark, setDarkMode] = useState<boolean>(darkSetting ?? false);

  const nonce = useNonce();

  return (
    <DarkModeContext.Provider
      value={{
        dark,
        setDarkMode,
      }}
    >
      <UserContext.Provider value={(user as Promise<Player>) ?? null}>
        <html lang="en" className="h-full">
          <head>
            <Meta />
            <LinksBlock />
            <meta name="sentry-dsn" content={dsn} />
          </head>
          <body
            className={`${
              dark
                ? `dark graphiql-dark bg-neutral-900 text-white`
                : `graphiql-light bg-white text-neutral-900`
            } overflow-auto flex flex-col`}
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
            <ScrollRestoration nonce={nonce} />
            <Scripts nonce={nonce} />
            <LiveReload />
          </body>
        </html>
      </UserContext.Provider>
    </DarkModeContext.Provider>
  );
}
