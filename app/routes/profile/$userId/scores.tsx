import { ErrorBoundaryComponent, json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { language } from "~/lib/api/config";
import apiFetcher from "~/lib/api/fetcher";
import { PlayerScore } from "~/lib/interfaces/api/player-score";

export const ErrorBoundary: ErrorBoundaryComponent = () => {
  return <div>Failed to load scores</div>;
};

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.userId, "Expected User ID");

  const [{ data: scores }] = await Promise.all([
    apiFetcher.get(`/players/${params.userId}/scores?sortBy=rank`),
  ]);

  return json({ scores });
};

const Scores = () => {
  const { scores } = useLoaderData<{ scores: PlayerScore[] }>();
  return (
    <div className="prose max-w-none w-full dark:prose-invert">
      <h2>Scores</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Song</th>
            <th>Category</th>
            <th>Accuracy</th>
            <th>AP</th>
            <th>Time Set</th>
            <th>Difficulty</th>
            <th>Complexity</th>
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
