import campaignLogo from "~/lib/images/campaign.png";
import CampaignIntroBody from "~/lib/campaign-intro.md";
import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => ({
  title: "ACC Campaign | AccSaber",
});

const CampaignIntro = () => (
  <div className="prose dark:prose-invert max-w-screen-lg mx-auto p-4 py-8">
    <CampaignIntroBody />
  </div>
);

export default CampaignIntro;
