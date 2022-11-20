import React, { use } from "react";
import invariant from "tiny-invariant";
import PageHeader from "~/app/Components/PageHeader";
import { json } from "~/lib/api/fetcher";
import { Category } from "~/lib/interfaces/api/category";

const LeaderboardLayout = async ({
  children,
  params,
}: {
  params?: { category: string } | Record<string, string>;
  searchParams?: Record<string, string | string[]>;
  children: React.ReactNode;
}) => {
  const categories = await json<Category[]>("categories");
  invariant(params?.category);

  const category = params.category;
  return (
    <>
      <PageHeader
        navigation={[
          {
            href: `/leaderboards/overall`,
            label: `Overall`,
            isCurrent: category == "overall",
          },
          ...categories.map((cat) => ({
            href: `/leaderboards/${cat.categoryName}`,
            label: cat.categoryDisplayName,
            isCurrent: category == cat.categoryName,
          })),
        ]}
      >
        Leaderboards
      </PageHeader>
      {children}
    </>
  );
};

export default LeaderboardLayout;

export const revalidate = 86400;
