import { use } from "react";
import config from "~/lib/api/config";
import { json } from "~/lib/api/fetcher";
import CampaignMission from "~/lib/interfaces/campaign/mission";

export default async function CampaignLeaderboardPage(props: {
  params?: Record<string, string> & { mission: string };
}) {
  const mission = await json<CampaignMission>(
    `https://campaign-data.accsaber.com/${props?.params?.mission}.json`
  );
  const scores = await json<{ name: string; score: number; id: string }[]>(
    `https://campaigns.accsaber.com/leaderboards/${mission.hash.toUpperCase()}/${
      mission.characteristic
    }/${mission.difficulty}?page=0&pageSize=25`
  );
  return (
    <>
      <h1>{mission.name}</h1>
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
              <td>{n + 1}</td>
              <td>{score.name}</td>
              <td>{score.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
