import { Handlers, PageProps } from "$fresh/server.ts";
import { assert } from "https://deno.land/std@0.150.0/_util/assert.ts";
import type { PlayerScore } from "$interfaces/api/player-score.ts";
import {
  getPlayer,
  getPlayerScores,
  isErrorResponse,
  json,
} from "$lib/fetcher.ts";
import { Player } from "$interfaces/api/player.ts";
import Layout from "$components/Layout.tsx";
import DifficultyLabel from "$components/DifficultyLabel.tsx";
import SortButton from "$components/SortButton.tsx";
import { language } from "$lib/config.ts";
import Complexity from "$components/Complexity.tsx";
import PlayerHeader from "$islands/PlayerHeader.tsx";
import Img, { Size } from "$components/Image.tsx";
import PageHeader from "../../../../islands/PageHeader.tsx";
import { Category } from "../../../../interfaces/api/category.ts";

interface PlayerPageProps {
  player: Player;
  scores: PlayerScore[];
  page: number;
  pages: number;
  category: string;
  categories: Category[];
}

export const handler: Handlers<PlayerPageProps> = {
  async GET(request, { render, params, renderNotFound }) {
    {
      assert(params.userId, "Expected User ID");
      assert(params.category, "Expected Category");
      const category = params.category;
      const url = new URL(request.url);
      const page = parseInt(url.searchParams.get("page") ?? "1");
      const pageSize = 50;

      const sortBy = url.searchParams.get("sortBy") as keyof PlayerScore;
      const isReversed = url.searchParams.has("reverse");

      let [player, scores, categories] = await Promise.all([
        getPlayer(params.userId, params.category),
        getPlayerScores(params.userId, params.category),
        json<Category[]>("categories"),
      ]);

      if ("errorCode" in player || "errorCode" in scores)
        return renderNotFound();

      if (isErrorResponse(player)) return renderNotFound();
      if (isErrorResponse(scores)) scores = [];

      const count = scores.length;

      const rev = (scores: PlayerScore[]) =>
        (isReversed ? scores.reverse() : scores).splice(
          (page - 1) * pageSize,
          pageSize
        );

      const difficultyToNumber = (difficulty: string) =>
        ["easy", "normal", "hard", "expert", "expertplus"].indexOf(
          difficulty.toLowerCase()
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
            (a, b) =>
              new Date(a.timeSet).getTime() - new Date(b.timeSet).getTime()
          );
          break;

        case "difficulty":
          scores.sort(
            (a, b) =>
              difficultyToNumber(a.difficulty) -
              difficultyToNumber(b.difficulty)
          );
          break;

        case "songName":
        case "categoryDisplayName":
          scores.sort((a, b) => (a[sortBy] < b[sortBy] ? -1 : 1));
      }
      return render({
        player,
        scores: rev(scores),
        page,
        pages: Math.ceil(count / pageSize),
        category,
        categories,
      });
    }
  },
};

const columns: [keyof PlayerScore | null, string, number?][] = [
  ["rank", ""],
  ["songName", "Song Name", 2],
  ["difficulty", "Difficulty"],
  ["categoryDisplayName", "Category"],
  ["accuracy", "Accuracy"],
  ["ap", "AP"],
  ["weightedAp", "Weighted"],
  ["timeSet", "Time Set"],
  ["complexity", "Complexity"],
];

const PlayerScoresPage = (props: PageProps<PlayerPageProps>) => {
  const { player, scores, page, pages, category, categories } = props.data;
  return (
    <Layout currentRoute={`/profile/${player.playerId}/${category}/scores`}>
      <PageHeader
        image={player.avatarUrl}
        navigation={[
          { categoryName: "overall", categoryDisplayName: "Overall" },
          ...(categories ?? []),
        ].map(({ categoryDisplayName, categoryName }) => ({
          href: `/profile/${player.playerId}/${categoryName}/scores`,
          label: categoryDisplayName,
          isCurrent: categoryName == category,
        }))}
      >
        {player.playerName}'
        {player.playerName[player.playerName.length - 1] !== "s" && "s"} Profile
      </PageHeader>
      <PlayerHeader player={player} />
      <div className="prose max-w-screen-lg mx-auto p-6">
        <table className="overflow-auto whitespace-nowrap">
          <thead>
            <tr>
              {columns.map(([value, friendly, colSpan], n) => (
                <th key={n} colSpan={colSpan}>
                  {value ? (
                    <SortButton name="sortBy" value={value}>
                      {friendly}
                    </SortButton>
                  ) : (
                    friendly
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {scores.map((score) => (
              <tr key={score.songHash + score.difficulty}>
                <td>#{score.rank}</td>

                <td className="relative w-10 h-10 m-0 flex">
                  <Img
                    src={`https://cdn.accsaber.com/covers/${score.songHash.toUpperCase()}.png`}
                    size={Size.THUMBNAIL}
                    className="object-cover absolute top-0 left-0 w-10 h-10"
                    style={{ margin: 0 }}
                  />
                </td>
                <td className="max-w-[10rem] text-ellipsis whitespace-nowrap w-full overflow-hidden">
                  <a href={`/maps/${score.leaderboardId}`}>
                    {score.songAuthorName} - {score.songName}
                  </a>
                </td>
                <td>
                  <DifficultyLabel>{score.difficulty}</DifficultyLabel>
                </td>
                <td>{score.categoryDisplayName}</td>
                <td>
                  {(score.accuracy * 100).toLocaleString(language, {
                    maximumFractionDigits: 2,
                  })}
                  %
                </td>
                <td>
                  {score.ap.toLocaleString(language, {
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td>
                  {score.weightedAp?.toLocaleString(language, {
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td title={new Date(score.timeSet).toLocaleString(language)}>
                  {
                    (Date.now() - new Date(score.timeSet).getTime(),
                    {
                      long: true,
                    })
                  }{" "}
                  ago
                </td>
                <td>
                  <Complexity>{score.complexity}</Complexity>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default PlayerScoresPage;
