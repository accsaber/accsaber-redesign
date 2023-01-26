import { Suspense, use } from "react";
import PlayerHeader, { PlayerHeaderFallback } from "../Components/PlayerHeader";
export default function ProfileLayout({
  params,
  children,
}: {
  params: { playerId: string; category: string };
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<PlayerHeaderFallback playerId={params.playerId} />}>
        <PlayerHeader playerId={params.playerId} category={params.category} />
      </Suspense>
      <div className="relative max-w-screen-lg py-8 mx-auto">{children}</div>
    </>
  );
}
