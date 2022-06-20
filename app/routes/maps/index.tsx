import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import ms from "ms";
import { language } from "~/lib/api/config";
import { getMapList } from "~/lib/api/map";
import Complexity from "~/lib/components/complexity";
import DifficultyLabel from "~/lib/components/difficultyLabel";
import MapRow from "~/lib/components/mapRow";
import PageHeader from "~/lib/components/pageHeader";
import SortButton from "~/lib/components/sortButton";
import type { RankedMap } from "~/lib/interfaces/api/ranked-map";
import scores from "../profile/$userId/$category/scores";

export const meta = () => ({
  title: "Ranked Maps | AccSaber",
});

export const loader: LoaderFunction = async ({ request }) => {
  let maps = await getMapList();
  const { searchParams } = new URL(request.url);

  const sortBy = searchParams.get("sortBy");
  const isReversed = searchParams.has("reverse");

  const rev = (items: any[]) => (isReversed ? items.reverse() : items);

  const difficultyToNumber = (difficulty: string) =>
    ["easy", "normal", "hard", "expert", "expertplus"].indexOf(
      difficulty.toLowerCase()
    );

  switch (sortBy) {
    case "complexity":
      maps = maps.sort((a, b) => a[sortBy] - b[sortBy]);
      break;

    case "difficulty":
      maps = maps.sort(
        (a, b) =>
          difficultyToNumber(a.difficulty) - difficultyToNumber(b.difficulty)
      );
      break;

    case "songName":
    case "categoryDisplayName":
    case "levelAuthorName":
      maps = maps.sort((a, b) => (a[sortBy] < b[sortBy] ? -1 : 1));
  }

  return { maps: rev(maps) };
};

const RankedMapsPage = () => {
  const { maps } = useLoaderData<{ maps: RankedMap[] }>();

  const columns: [keyof RankedMap | null, string, number?][] = [
    ["songName", "Song Name", 2],
    ["difficulty", "Difficulty"],
    ["levelAuthorName", "Mapper"],
    ["categoryDisplayName", "Category"],
    ["complexity", "Complexity"],
  ];
  return (
    <>
      <PageHeader>Ranked Maps</PageHeader>
      <div className="prose w-full dark:prose-invert max-w-screen-lg mx-auto px-4 py-8">
        <h2>Ranked Maps</h2>
        <table>
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
            {maps.map((map) => (
              <MapRow map={map} key={map.leaderboardId} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RankedMapsPage;
