import type { MetaFunction } from "@remix-run/node";
import styles from "./__generated__/tailwind.css";
import {
  Links as LinksBlock,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Suspense } from "react";
import Header from "@/Header";
import { ExclamationIcon } from "@heroicons/react/outline";
import config from "./lib/api/config";
import LoadingSpinner from "@/LoadingSpinner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const links = () => [
  {
    href: styles,
    rel: "stylesheet",
  },
];

export default function App() {
  const queryClient = new QueryClient({});
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <LinksBlock />
      </head>
      <body className="dark:bg-neutral-900 dark:text-white flex flex-col h-full overflow-auto">
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
  );
}
