import Link from "next/link";
import { use } from "react";
import { json } from "~/lib/api/fetcher";
import CampaignMission from "~/lib/interfaces/campaign/mission";

export default function CampaignMissionButton({ id }: { id: number }) {
  const missionInfo = use(
    json<CampaignMission>(`https://campaign-data.accsaber.com/${id}.json`)
  );

  return (
    <Link href={`/campaign/missions/${id}`}>
      {missionInfo.name.replace(/<.*?>/g, "")}
    </Link>
  );
}
