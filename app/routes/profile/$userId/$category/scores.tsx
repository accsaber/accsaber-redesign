import {
  ActionFunction,
  ErrorBoundaryComponent,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useLoaderData, useLocation } from "@remix-run/react";
import ms from "ms";
import invariant from "tiny-invariant";
import { user } from "~/cookies";
import { language } from "~/lib/api/config";
import { get } from "~/lib/api/fetcher";
import Complexity from "~/lib/components/complexity";
import Pagination from "~/lib/components/pagination";
import type { PlayerScore } from "~/lib/interfaces/api/player-score";

export const ErrorBoundary: ErrorBoundaryComponent = () => {
  return <div>Failed to load scores</div>;
};

export const action: ActionFunction = async ({ params }) => {
  invariant(params.userId, "Expected User ID");

  return redirect(`/profile/${params.userId}/scores`, {
    headers: {
      "set-cookie": await user.serialize({ userId: params.userId }),
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

  const rawScores = await get<PlayerScore[]>(
    `/players/${params.userId}/scores`
  );
  const sortBy = url.searchParams.get("sortBy") as keyof PlayerScore;
  const isReversed = url.searchParams.has("reverse");

  let scores =
    params.category == "overall"
      ? rawScores
      : rawScores.filter(
          (score) =>
            // incredibly hacky fix until we have a proper api route
            score.categoryDisplayName.toLowerCase() == `${category} acc`
        );

  const rev = (scores: PlayerScore[]) =>
    (isReversed ? scores.reverse() : scores).splice(
      (page - 1) * pageSize,
      pageSize
    );

  switch (sortBy) {
    case "rank":
    case "accuracy":
    case "ap":
    case "complexity":
      scores = scores.sort((a, b) => a[sortBy] - b[sortBy]);
      break;
    case "timeSet":
      scores.sort(
        (a, b) => new Date(a.timeSet).getTime() - new Date(b.timeSet).getTime()
      );
      break;

    case "songName":
    case "categoryDisplayName":
      scores = scores.sort((a, b) => (a[sortBy] < b[sortBy] ? -1 : 1));
  }
  return json(
    {
      scores: rev(scores),
      page,
      pages: Math.ceil(scores.length / pageSize) + 1,
    },
    {
      headers: {
        "cache-control": `public, max-age=86400, stale-while-revalidate=86400`,
      },
    }
  );
};

const SortButton: React.FC<{ name: string; value: string }> = ({
  children,
  name,
  value,
}) => {
  const query = new URLSearchParams(useLocation().search);
  return (
    <Form method="get">
      <input type="hidden" name={name} value={value} />
      {query.get(name) == value && !query.has("reverse") ? (
        <input type={"hidden"} name="reverse" />
      ) : (
        ""
      )}
      <button
        className="[font:inherit] flex w-full justify-between"
        type="submit"
      >
        {children}
        <div>
          {query.get(name) !== value ? (
            "-"
          ) : query.has("reverse") ? (
            <>&uarr;</>
          ) : (
            <>&darr;</>
          )}
        </div>
      </button>
    </Form>
  );
};
const Scores = () => {
  const { scores, page, pages } = useLoaderData<{
    scores: PlayerScore[];
    page: number;
    pages: number;
  }>();
  const columns: [keyof PlayerScore | null, string][] = [
    ["rank", ""],
    [null, ""],
    ["songName", "Song Name"],
    ["categoryDisplayName", "Category"],
    ["accuracy", "Accuracy"],
    ["ap", "AP"],
    ["timeSet", "Time Set"],
    [null, "Difficulty"],
    ["complexity", "Complexity"],
  ];
  return (
    <div className="flex gap-8 flex-col">
      <Pagination currentPage={page} pages={pages} />
      <div className="prose max-w-none w-full dark:prose-invert">
        <h2>Scores</h2>
        <table>
          <thead>
            <tr>
              {columns.map(([value, friendly], n) => (
                <th key={n}>
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

                <td className="relative aspect-square w-10">
                  <img
                    src={`/maps/${score.leaderboardId}.thumbnail.webp`}
                    alt={``}
                    loading="lazy"
                    className="absolute top-0 left-0 m-0"
                  />
                </td>
                <td className="max-w-[10rem] text-ellipsis whitespace-nowrap w-min overflow-hidden">
                  <Link to={`/maps/${score.leaderboardId}`}>
                    {score.songName}
                  </Link>
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
                <td title={new Date(score.timeSet).toLocaleString(language)}>
                  {ms(Date.now() - new Date(score.timeSet).getTime(), {
                    long: true,
                  })}{" "}
                  ago
                </td>
                <td>{score.difficulty}</td>
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
