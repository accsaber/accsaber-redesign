import PageHeader from "@/PageHeader";
import Image from "next/image";
import { use } from "react";
import { json } from "~/lib/api/fetcher";
import Campaign from "~/lib/interfaces/campaign/campaign";
import CampaignMissionButton from "./Components/missionButton";
import campaignIcon from "../../../public/images/campaign.png";

export default function CampaignMissionsLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const info = use(
    json<Campaign>(`https://campaign-data.accsaber.com/info.json`)
  );
  return (
    <>
      <PageHeader image={<Image src={campaignIcon} alt="" height={32} />}>
        Campaign Leaderboard Viewer
      </PageHeader>
      <div className="flex flex-1 w-full max-w-screen-lg gap-2 p-6 mx-auto">
        <ul>
          {info.mapPositions
            .sort((a, b) => a.y - b.y)
            .map((map, n) => (
              <li key={`${map.x}x${map.y}`}>
                <CampaignMissionButton id={n} />
              </li>
            ))}
        </ul>
        <div className="flex-1 prose dark:prose-invert">{children}</div>
      </div>
    </>
  );
}

export const revalidate = 3600;
