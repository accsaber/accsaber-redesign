export default interface CampaignMission {
  name: string;
  songid: string;
  customDownloadURL: string;
  characteristic: string;
  difficulty: number;
  modifiers: {
    fastNotes: boolean;
    songSpeed: number;
    noBombs: boolean;
    disappearingArrows: boolean;
    strictAngles: boolean;
    noObstacles: boolean;
    batteryEnergy: boolean;
    failOnSaberClash: boolean;
    instaFail: boolean;
    noFail: boolean;
    noArrows: boolean;
    ghostNotes: boolean;
    energyType: number;
    enabledObstacleType: number;
    speedMul: number;
  };
  requirements: {
    isMax: boolean;
    type: string;
    count: number;
  }[];
  externalModifiers: {};
  challengeInfo: null;
  unlockableItems: never[];
  unlockMap: boolean;
  hash: string;
  allowStandardLevel: boolean;
  optionalExternalModifiers: {
    "ACC Campaign Score Submission": ["Score Submission"];
  };
}
