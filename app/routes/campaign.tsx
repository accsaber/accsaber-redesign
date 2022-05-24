import { json, LoaderFunction } from "@remix-run/node";
import { get } from "~/lib/api/fetcher";
import PageHeader from "~/lib/components/pageHeader";
import Campaign from "~/lib/interfaces/campaign/campaign";
import campaignLogo from "~/lib/images/campaign.png";
import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from "@remix-run/react";
import CampaignMission from "~/lib/interfaces/campaign/mission";

const CampaignRoute = () => {
  return (
    <>
      <PageHeader
        image={campaignLogo}
        navigation={[
          {
            href: "/campaign/",
            label: "Intro",
          },

          {
            href: "/campaign/mission/1",
            label: "Missions",
            isCurrent: useLocation().pathname.startsWith("/campaign/mission"),
          },
        ]}
      >
        Acc Champ Community Campaign
      </PageHeader>
      <Outlet />
    </>
  );
};

export default CampaignRoute;
