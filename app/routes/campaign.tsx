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
        iconRounded={false}
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
        actionButton={
          <a
            href="https://github.com/accsaber/ACC-Campaign/releases"
            className="px-4 py-3 bg-gradient-to-l from-purple-600 shadow-teal shadow to-blue-600 rounded text-white"
          >
            Get the Campaign
          </a>
        }
      >
        Acc Champ Community Campaign
      </PageHeader>
      <Outlet />
    </>
  );
};

export default CampaignRoute;
