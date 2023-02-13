import type { MapRowFragment, RankedMapsQuery } from "$gql";
import { BeatMapsOrderBy, RankedMapsDocument } from "$gql";
import GQLSortButton from "@/GQLSortButton";
import MapRow from "@/MapRow";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { gqlClient } from "~/lib/api/gql";

export const loader: LoaderFunction = async ({ request }) => {
  const { searchParams } = new URL(request.url);

  const sortByParam = (searchParams.get("sortBy") ??
    "DateRankedDesc") as keyof typeof BeatMapsOrderBy;
  return await gqlClient.request(RankedMapsDocument, {
    orderBy: BeatMapsOrderBy[sortByParam] ?? BeatMapsOrderBy.DateRankedAsc,
  });
};

export const meta: MetaFunction = () => ({
  title: "AccSaber Ranked Maps",
});

export default function RankedMapsPage() {
  const { beatMaps: maps } = useLoaderData<RankedMapsQuery>();
  const [searchParams] = useSearchParams();
  const columns: [(keyof typeof BeatMapsOrderBy)[] | null, string, number?][] =
    [
      [null, "Song Name", 2],
      [null, "Difficulty"],
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
                    currentValue={searchParams.get("sortBy") ?? undefined}
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
            <MapRow map={map as MapRowFragment} key={map.leaderboardId} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
