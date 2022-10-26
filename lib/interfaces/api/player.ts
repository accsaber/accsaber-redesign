export interface Player {
  rank: number;
  rankLastWeek: number;
  playerName: string;
  playerId: string;
  ap: number;
  averageAcc: number;
  hmd: string;
  avatarUrl: string;
  accChamp: boolean;

  averageApPerMap: number;
  rankedPlays: number;
}
