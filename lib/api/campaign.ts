import CampaignStatus from "../interfaces/campaign/campaignStatus";
export const getHighestLevel = (campaignStatus: CampaignStatus[]) =>
	campaignStatus.reduce(
		(current, { milestoneId, pathCleared }) =>
			pathCleared ? Math.max(milestoneId ?? 0, current) : current,
		-1,
	);

// const getCampaignStatus = (playerId: string, campaignId = 0) =>
//   json<CampaignStatus[]>(
//     `https://campaigns.accsaber.com/${campaignId}/player-campaign-infos/${playerId}`
//   );

const getCampaignStatus = async (playerId: string, campaignId = 0) => [];

export default getCampaignStatus;
