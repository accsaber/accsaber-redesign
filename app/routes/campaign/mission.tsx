import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { get } from "~/lib/api/fetcher";
import type Campaign from "~/lib/interfaces/campaign/campaign";
import type CampaignMission from "~/lib/interfaces/campaign/mission";

export const loader: LoaderFunction = async () => {
  const campaignInfo = await get<Campaign>(
    "https://campaign-data.pages.dev/info.json"
  );
  const levels = await Promise.all(
    campaignInfo.mapPositions.map((map, i) =>
      get(`https://campaign-data.pages.dev/${i}.json`)
    )
  );
  return json({ campaignInfo, levels });
};

const MissionListRoute = () => {
  const { campaignInfo: campaign, levels } = useLoaderData<{
    campaignInfo: Campaign;
    levels: CampaignMission[];
  }>();
  return (
    <div className="flex max-w-screen-lg mx-auto p-4 flex-1 dark:prose-invert">
      <ol className="grid grid-cols-1 w-72 overflow-auto h-full flex-shrink">
        {levels.map((mission, n) => (
          <li key={n}>
            <Link to={`/campaign/mission/${n}`} style={{}}>
              {mission.name.replace(/<.*?>/g, "")}
            </Link>
          </li>
        ))}
      </ol>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default MissionListRoute;
