import { RankedMap } from "$interfaces/api/ranked-map";
import GQLSortButton from "@/GQLSortButton";
import { use } from "react";
import MapRow from "~/app/maps/Components/MapRow";
import { sdk } from "~/lib/api/gql";
import { BeatMapsOrderBy } from "~/lib/__generated__/gql";

export default function MapsListPage({
  searchParams,
}: {
  params?: Record<string, string>;
  searchParams?:
    | { sortBy?: string | string[] }
    | Record<string, string | string[]>;
}) {
  const sortByParam = (searchParams?.sortBy?.toString() ??
    "DateRankedDesc") as keyof typeof BeatMapsOrderBy;
  const { beatMaps: maps } = use(
    sdk.RankedMaps({
      orderBy: BeatMapsOrderBy[sortByParam] ?? BeatMapsOrderBy.DateRankedAsc,
    })
  );

  const columns: [(keyof typeof BeatMapsOrderBy)[] | null, string, number?][] =
    [
      [null, "Song Name", 2],
      [["DifficultyAsc", "DifficultyDesc"], "Difficulty"],
      [null, "Mapper"],
      [["CategoryIdAsc", "CategoryIdDesc"], "Category"],
      [["ComplexityAsc", "ComplexityDesc"], "Complexity"],
      [["DateRankedAsc", "DateRankedDesc"], "Date Ranked"],
    ];

  return (
    <div className="w-full max-w-screen-lg px-4 py-8 mx-auto prose dark:prose-invert">
      <table>
        <thead>
          <tr>
            {columns.map(([value, friendly, colSpan], n) => (
              <th key={n} colSpan={colSpan}>
                {value ? (
                  <GQLSortButton
                    values={value}
                    currentValue={searchParams?.sortBy}
                  >
                    {friendly}
                  </GQLSortButton>
                ) : (
                  friendly
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {maps?.nodes?.map((map) => (
            <MapRow map={map} key={map.leaderboardId} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const revalidate = 600;
