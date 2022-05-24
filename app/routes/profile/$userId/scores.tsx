import { ErrorBoundaryComponent, json, LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData, useLocation } from "@remix-run/react";
import invariant from "tiny-invariant";
import { language } from "~/lib/api/config";
import apiFetcher from "~/lib/api/fetcher";
import { PlayerScore } from "~/lib/interfaces/api/player-score";

export const ErrorBoundary: ErrorBoundaryComponent = () => {
  return <div>Failed to load scores</div>;
};

export const loader: LoaderFunction = async ({ params, request }) => {
  invariant(params.userId, "Expected User ID");
  const url = new URL(request.url);

  const [{ data: scores }] = await Promise.all([
    apiFetcher.get<PlayerScore[]>(`/players/${params.userId}/scores`),
  ]);

  const sortBy = url.searchParams.get("sortBy") as keyof PlayerScore;
  const isReversed = url.searchParams.has("reverse");

  const rev = (scores: PlayerScore[]) =>
    isReversed ? scores.reverse() : scores;

  switch (sortBy) {
    case "rank":
    case "accuracy":
    case "ap":
    case "complexity":
      return json({
        scores: rev(scores.sort((a, b) => a[sortBy] - b[sortBy])),
      });
    case "timeSet":
      return json({
        scores: rev(
          scores.sort(
            (a, b) =>
              new Date(a.timeSet).getTime() - new Date(b.timeSet).getTime()
          )
        ),
      });

    case "songName":
    case "categoryDisplayName":
      return json({
        scores: rev(scores.sort((a, b) => (a[sortBy] < b[sortBy] ? -1 : 1))),
      });
    default:
      return json({ scores: rev(scores) });
  }
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
  const { scores } = useLoaderData<{ scores: PlayerScore[] }>();
  return (
    <div className="prose max-w-none w-full dark:prose-invert">
      <h2>Scores</h2>
      <table>
        <thead>
          <tr>
            {[
              ["rank", "Rank"],
              ["songName", "Song Name"],
              ["categoryName", "Category"],
              ["accuracy", "Accuracy"],
              ["ap", "AP"],
              ["timeSet", "Time Set"],
              [null, "Difficulty"],
              ["complexity", "Complexity"],
            ].map(([value, friendly]) => (
              <th key={value}>
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
              <td>{score.songName}</td>
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
              <td>{new Date(score.timeSet).toLocaleString(language)}</td>
              <td>{score.difficulty}</td>
              <td>{score.complexity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Scores;
