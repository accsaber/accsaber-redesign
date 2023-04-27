import PlayerResult from "@/PlayerResult";
import MapResult from "@/MapResult";
import type { LoaderFunction } from "@remix-run/node";
import { json as jsonResponse } from "@remix-run/node";
import { search } from "./api/search";
import { Form, useLoaderData, useLocation } from "@remix-run/react";
import type { Player } from "$interfaces/api/player";
import type { RankedMap } from "$interfaces/api/ranked-map";
import type { LegacyRef } from "react";
import { useRef, useState } from "react";
import LoadingSpinner from "@/LoadingSpinner";
import { json } from "~/lib/api/fetcher";

interface SearchData {
  query: string;
  results: Awaited<ReturnType<typeof search>>;
}

export const loader: LoaderFunction = async ({ request }) => {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("q") ?? "";

  if (query.length < 3) return jsonResponse({ query, results: [] });

  const results = await search(query);

  return jsonResponse({ query, results });
};

const isMap = (i: RankedMap | Player): i is RankedMap => {
  return "songHash" in i;
};

export function SearchPageBody({
  loaderData = { query: "", results: [] },
  close,
  searchRef,
}: {
  loaderData?: SearchData;
  close?: () => void;
  searchRef?: LegacyRef<HTMLInputElement>;
}) {
  const { pathname } = useLocation();

  const [query, setQuery] = useState(loaderData.query ?? "");
  const [results, setResults] = useState<SearchData["results"] | "loading">(
    loaderData.results ?? []
  );

  const formRef = useRef<HTMLFormElement>();
  const debounce = useRef<ReturnType<typeof setTimeout>>();

  const resultsBox = useRef<HTMLDivElement>();

  return (
    <main className="flex flex-col max-w-screen-lg gap-4 py-4 md:px-4 mx-auto w-full">
      <div className=" bg-white dark:bg-neutral-900 rounded overflow-auto text-neutral-900 dark:text-neutral-100">
        <Form
          className="flex overflow-hidden rounded shadow relative"
          method="get"
          action="/search"
          ref={(r) => (formRef.current = r ?? undefined)}
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            if (pathname === "/search")
              history.pushState(
                {},
                "",
                `/search?q=${encodeURIComponent(
                  formData.get("q")?.toString() ?? ""
                )}`
              );
            setQuery(formData.get("q")?.toString() ?? "");
            setResults("loading");

            const data = await json<SearchData>(
              new URL(
                `/api/search?query=${encodeURIComponent(
                  formData.get("q")?.toString() ?? ""
                )}`,
                location.href
              )
            );

            setResults(data.results);
          }}
        >
          <input
            type="search"
            name="q"
            autoFocus
            placeholder="Search"
            className="flex-1 p-3 px-5 focus:outline-none bg-white dark:bg-neutral-800 dark:text-white"
            defaultValue={query}
            autoComplete={"off"}
            ref={searchRef}
            onChange={() => {
              clearTimeout(debounce.current);
              setResults("loading");

              debounce.current = setTimeout(() => {
                formRef?.current?.requestSubmit();
              }, 500);
            }}
          />
          <button
            type="submit"
            aria-label="Search"
            className="p-3 bg-white dark:bg-neutral-800 dark:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </Form>

        <div ref={(self) => self && (resultsBox.current = self)}>
          {results == "loading" ? (
            <div className="flex items-center justify-start p-6 gap-1">
              {new Array(3).fill(null).map((_i, n) => (
                <div
                  className="w-4 h-4 rounded-full bg-neutral-300 dark:bg-neutral-600 animate-pulse"
                  style={{
                    animationDelay: `${n * 100}ms`,
                  }}
                  key={n}
                ></div>
              ))}
            </div>
          ) : Array.isArray(results) && results.length > 0 ? (
            results.map((result) =>
              isMap(result.item) ? (
                <MapResult
                  map={result.item}
                  key={result.item.leaderboardId}
                  onClick={close}
                />
              ) : (
                <PlayerResult
                  player={result.item}
                  key={result.item.playerId}
                  onClick={close}
                />
              )
            )
          ) : (
            <div className="opacity-80 p-4">
              {query.length < 2
                ? "Search must be 2 or more characters"
                : "No results"}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function SearchPage() {
  const loaderData = useLoaderData<SearchData>();

  return <SearchPageBody loaderData={loaderData} />;
}
