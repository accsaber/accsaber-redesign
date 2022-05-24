export default interface Campaign {
  name: string;
  desc: string;
  bigDesc: string;
  allUnlocked: boolean;
  mapPositions: {
    childNodes: number[];
    x: number;
    y: number;
    scale: number;
    letterPortion?: string;
    numberPortion: number;
    nodeOutlineLocation: string;
    nodeBackgroundLocation: string;
    nodeDefaultColor: string;
    nodeHighlightColor: string;
  }[];
  unlockGate: never[];
  mapHeight: number;
  backgroundAlpha: number;
  lightColor: {
    r: number;
    g: number;
    b: number;
  };
  customMissionLeaderboard: string;
}
