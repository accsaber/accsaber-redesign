import { RankedMap } from "$interfaces/api/ranked-map";
import { use } from "react";
import { json } from "~/lib/api/fetcher";
import MapRow from "~/app/maps/Components/MapRow";
import SortButton from "../Components/SortButton";

export default async function MapsListPage() {
  const maps = await json<RankedMap[]>("ranked-maps");

  const columns: [keyof RankedMap | null, string, number?][] = [
    ["songName", "Song Name", 2],
    ["difficulty", "Difficulty"],
    ["levelAuthorName", "Mapper"],
    ["categoryDisplayName", "Category"],
    ["complexity", "Complexity"],
    ["dateRanked", "Date Ranked"],
  ];

  return (
    <div className="w-full max-w-screen-lg px-4 py-8 mx-auto prose dark:prose-invert">
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
  );
}
