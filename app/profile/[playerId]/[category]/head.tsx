import { notFound } from "next/navigation";
import { use } from "react";
import invariant from "tiny-invariant";
import { getPlayer, json } from "~/lib/api/fetcher";

export default function PlayerProfileHead({
  params,
}: {
  params?: { playerId?: string } | Record<string, string>;
}) {
  invariant(params?.playerId);
  const player = use(
    getPlayer(params?.playerId).catch(() => {
      return undefined;
    })
  );
  return (
    <>
      <title key="pageTitle">{`${player?.playerName}'s Profile`}</title>
    </>
  );
}

export const revalidate = 86400;
