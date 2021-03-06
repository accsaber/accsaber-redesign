import CampaignIntroBody from "~/lib/strings/campaign-intro.md";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => ({
  title: "ACC Campaign | AccSaber",
});

const CampaignIntro = () => (
  <div className="prose dark:prose-invert max-w-screen-lg mx-auto p-4 py-8">
    <CampaignIntroBody />
  </div>
);

export default CampaignIntro;
