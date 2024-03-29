import CampaignStatus from "../interfaces/campaign/campaignStatus";
import { json } from "./fetcher";

export const getHighestLevel = (campaignStatus: CampaignStatus[]) =>
	campaignStatus.reduce(
		(current, { milestoneId, pathCleared }) =>
			pathCleared ? Math.max(milestoneId ?? 0, current) : current,
		-1,
	);

const getCampaignStatus = (playerId: string, campaignId = 0) =>
	json<CampaignStatus[]>(
		`https://campaigns-test.accsaber.com/${campaignId}/player-campaign-infos/${playerId}`,
	);

export default getCampaignStatus;
