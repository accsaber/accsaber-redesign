import { PlayerScore } from "../interfaces/api/player-score";
import { json } from "./fetcher";

const difficultyToNumber = (difficulty: string) =>
  ["easy", "normal", "hard", "expert", "expertplus"].indexOf(
    difficulty.toLowerCase()
  );

const getPlayerScores = async (
  userId: string,
  category = "overall",
  sortBy: keyof PlayerScore = "weightedAp",
  reverse = false
) => {
  const categoryString =
    category == "overall" ? "" : `/${encodeURIComponent(category)}`;
  const scores = await json<PlayerScore[]>(
    `players/${encodeURIComponent(userId)}${categoryString}/scores`
  );

  switch (sortBy) {
    case "rank":
    case "accuracy":
    case "complexity":
    case "ap":
    case "weightedAp":
      scores.sort((a, b) => (a[sortBy] ?? 0) - (b[sortBy] ?? 0));
      break;
    case "timeSet":
      scores.sort(
        (a, b) => new Date(a.timeSet).getTime() - new Date(b.timeSet).getTime()
      );
      break;

    case "difficulty":
      scores.sort(
        (a, b) =>
          difficultyToNumber(a.difficulty) - difficultyToNumber(b.difficulty)
      );
      break;

    case "songName":
    case "categoryDisplayName":
      scores.sort((a, b) => (a[sortBy] < b[sortBy] ? -1 : 1));
  }
  if (reverse) scores.reverse();

  return scores;
};

export default getPlayerScores;
