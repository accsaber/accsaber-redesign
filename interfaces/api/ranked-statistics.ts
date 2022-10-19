export interface RankedStatistics {
  mapCount: number;
  trueAccMapCount: number;
  standardAccMapCount: number;
  techAccMapCount: number;

  complexityToMapCount: { [n: number]: number };
}
