import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { get } from "~/lib/api/fetcher";
import type Campaign from "~/lib/interfaces/campaign/campaign";
import type CampaignMission from "~/lib/interfaces/campaign/mission";

export const loader: LoaderFunction = async () => {
  const headers = new Headers();
  const campaignInfo = await get<Campaign>(
    "https://campaign-data.pages.dev/info.json",
    headers
  );
  const levels = await Promise.all(
    campaignInfo.mapPositions.map((map, i) =>
      get(`https://campaign-data.pages.dev/${i}.json`, headers)
    )
  );
  return json({ campaignInfo, levels }, { headers });
};

const MissionListRoute = () => {
  const { campaignInfo: campaign, levels } = useLoaderData<{
    campaignInfo: Campaign;
    levels: CampaignMission[];
  }>();
  return (
    <div className="flex max-w-screen-lg mx-auto p-4 flex-1">
      <ol className="grid grid-cols-1 w-72 overflow-auto h-full flex-shrink">
        {levels.map((mission, n) => (
          <li key={n}>
            <Link
              to={`/campaign/mission/${n}`}
              className="dark:text-neutral-300"
            >
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
