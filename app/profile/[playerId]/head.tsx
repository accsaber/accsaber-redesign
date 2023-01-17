import invariant from "tiny-invariant";
import { getPlayer } from "~/lib/api/fetcher";

export default async function PlayerProfileHead({
  params,
}: {
  params?: { playerId?: string } | Record<string, string>;
}) {
  invariant(params?.playerId);
  const player = await getPlayer(params?.playerId).catch(() => {
    return undefined;
  });
  return (
    <>
      <title key="pageTitle">{`${player?.playerName}'s Profile`}</title>
    </>
  );
}
