const RankGraph: React.FC<{
  children?: never;
  history: [string, number][];
}> = ({ history }) => {
  let min = Infinity;
  let max = 0;

  for (const [date, rank] of history) {
    min = Math.min(rank, min);
    max = Math.max(rank, max);
  }

  const scale = (rank: number, size: number = 100) =>
    ((rank - min) / (max - min)) * size;

  return (
    <svg
      viewBox="-5 -5 110 110"
      className="h-32 w-full"
      preserveAspectRatio="none"
    >
      <path
        d={
          `M0 ${scale(history[0][1])} ` +
          history
            .map(
              ([date, rank], n) =>
                `L ${(n / history.length) * 100} ${scale(rank)}`
            )
            .join(" ")
        }
        stroke="currentColor"
        vectorEffect="non-scaling-stroke"
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth={3}
        fill="transparent"
      />
    </svg>
  );
};

export default RankGraph;
