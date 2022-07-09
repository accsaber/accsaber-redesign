import type {
  ActionFunction,
  ErrorBoundaryComponent,
  LoaderFunction,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import ms from "ms";
import React from "react";
import invariant from "tiny-invariant";
import { user } from "~/cookies";
import { language } from "~/lib/api/config";
import { getPlayerScores } from "~/lib/api/player";
import Complexity from "~/lib/components/complexity";
import DifficultyLabel from "~/lib/components/difficultyLabel";
import Pagination from "~/lib/components/pagination";
import SortButton from "~/lib/components/sortButton";
import type { PlayerScore } from "~/lib/interfaces/api/player-score";

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  console.error(error);
  return (
    <div className="prose dark:prose-invert max-w-none">
      <p>
        <h1 className="text-red-600 dark:text-red-400">Error loading page</h1>
        <p>It looks like something's gone wrong.</p>
        <p>
          This website is still in development, and there's likely to be a few
          things broken
        </p>
        <p>
          If you've set this off with something obscure, let a dev know and
          we'll throw it on the pile
        </p>
        <p>
          If it's something really obvious, please don't, we probably already
          know {":)"}
        </p>
      </p>
    </div>
  );
};

export const action: ActionFunction = async ({ params }) => {
  invariant(params.userId, "Expected User ID");

  return redirect(`/profile/${params.userId}/scores`, {
    headers: {
      "set-cookie": await user.serialize(
        { userId: params.userId },
        {
          maxAge: 31536000,
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        }
      ),
    },
  });
};

export const loader: LoaderFunction = async ({ params, request }) => {
  invariant(params.userId, "Expected User ID");
  invariant(params.category, "Expected Category");
  const category = params.category;
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") ?? "1");
  const pageSize = 50;
  const headers = new Headers();

  headers.set(
    "cache-control",
    "public, max-age=86400, stale-while-revalidate=86400"
  );

  const sortBy = url.searchParams.get("sortBy") as keyof PlayerScore;
  const isReversed = url.searchParams.has("reverse");

  let { scores, count } = await getPlayerScores(params.userId, params.category);

  const rev = (scores: PlayerScore[]) =>
    (isReversed ? scores.reverse() : scores).splice(
      (page - 1) * pageSize,
      pageSize
    );

  const difficultyToNumber = (difficulty: string) =>
    ["easy", "normal", "hard", "expert", "expertplus"].indexOf(
      difficulty.toLowerCase()
    );

  switch (sortBy) {
    case "rank":
    case "accuracy":
    case "complexity":
    case "ap":
    case "weightedAp":
      scores.sort((a, b) => (a[sortBy] ?? 0) - (b[sortBy] ?? 0));
      break;
    case "timeSet":
      scores.sort(
        (a, b) => new Date(a.timeSet).getTime() - new Date(b.timeSet).getTime()
      );
      break;

    case "difficulty":
      scores.sort(
        (a, b) =>
          difficultyToNumber(a.difficulty) - difficultyToNumber(b.difficulty)
      );
      break;

    case "songName":
    case "categoryDisplayName":
      scores.sort((a, b) => (a[sortBy] < b[sortBy] ? -1 : 1));
  }
  return json(
    {
      scores: rev(scores),
      page,
      pages: Math.ceil(count / pageSize),
    },
    {
      headers,
    }
  );
};

const Scores = () => {
  const { state } = useTransition();
  const { scores, page, pages } = useLoaderData<{
    scores: PlayerScore[];
    page: number;
    pages: number;
  }>();
  const columns: [keyof PlayerScore | null, string, number?][] = [
    ["rank", ""],
    ["songName", "Song Name", 2],
    ["difficulty", "Difficulty"],
    ["categoryDisplayName", "Category"],
    ["accuracy", "Accuracy"],
    ["ap", "AP"],
    ["weightedAp", "Weighted AP"],
    ["timeSet", "Time Set"],
    ["complexity", "Complexity"],
  ];
  return (
    <div className="flex flex-col gap-8">
      <Pagination currentPage={page} pages={pages} />
      <div className="w-full prose max-w-none dark:prose-invert">
        <h2>Scores</h2>
        <table>
          <thead>
            <tr>
              {columns.map(([value, friendly, colSpan], n) => (
                <th key={n} colSpan={colSpan}>
                  {value ? (
                    <SortButton name="sortBy" value={value}>
                      {friendly}
                    </SortButton>
                  ) : (
                    friendly
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {scores.map((score) => (
              <tr key={score.songHash + score.difficulty}>
                <td>#{score.rank}</td>

                <td className="relative w-10 aspect-square">
                  <picture>
                    <source
                      srcSet={`/maps/${score.leaderboardId}.thumbnail.avif`}
                      type="image/avif"
                    />
                    <source
                      srcSet={`/maps/${score.leaderboardId}.thumbnail.webp`}
                      type="image/webp"
                    />
                    <img
                      src={`/maps/${score.leaderboardId}.thumbnail.jpeg`}
                      alt={``}
                      loading="lazy"
                      className="absolute top-0 left-0 m-0"
                    />
                  </picture>
                </td>
                <td className="max-w-[10rem] text-ellipsis whitespace-nowrap w-min overflow-hidden">
                  <Link to={`/maps/${score.leaderboardId}`}>
                    {score.songName}
                  </Link>
                </td>
                <td>
                  <DifficultyLabel>{score.difficulty}</DifficultyLabel>
                </td>
                <td>{score.categoryDisplayName}</td>
                <td>
                  {(score.accuracy * 100).toLocaleString(language, {
                    maximumFractionDigits: 2,
                  })}
                  %
                </td>
                <td>
                  {score.ap.toLocaleString(language, {
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td>
                  {score.weightedAp?.toLocaleString(language, {
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td title={new Date(score.timeSet).toLocaleString(language)}>
                  {ms(Date.now() - new Date(score.timeSet).getTime(), {
                    long: true,
                  })}{" "}
                  ago
                </td>
                <td>
                  <Complexity>{score.complexity}</Complexity>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination currentPage={page} pages={pages} />
    </div>
  );
};
export default Scores;
