import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { get } from "~/lib/api/fetcher";
import CampaignMission from "~/lib/interfaces/campaign/mission";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.mission, "Expected Mission ID");
  const mission = await get<CampaignMission>(
    `https://campaign-data.pages.dev/${params.mission}.json`
  );

  const scores = await get(
    `https://campaigns.accsaber.com/leaderboards/${mission.hash.toUpperCase()}/${
      mission.characteristic
    }/${mission.difficulty}?page=0&pageSize=10`
  );
  return json({ mission, scores });
};

export const ErrorBoundary = () => (
  <div className="text-red-500 flex items-center justify-center p-16">
    Failed to load level scoreboard
  </div>
);

const MissionView = () => {
  const { mission, scores } = useLoaderData<{
    scores: { name: string; score: number; id: string }[];
    mission: CampaignMission;
  }>();
  return (
    <div className="prose flex-1 max-w-none dark:prose-invert">
      <h1>{mission.name.replace(/<.*?>/g, "").replace(/\[.*?\]/g, "")}</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, n) => (
            <tr key={score.id}>
              <td>{n}</td>
              <td>{score.name}</td>
              <td>{score.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MissionView;
