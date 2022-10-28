import React, { Suspense } from "react";
import LoadingSpinner from "~/app/Components/LoadingSpinner";
import MapHeader, { MapHeaderFallback } from "../Components/MapHeader";

const MapLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { mapId: string };
}) => {
  return (
    <>
      <Suspense fallback={<MapHeaderFallback />}>
        <MapHeader mapId={params.mapId} />
      </Suspense>

      {children}
    </>
  );
};

export default MapLayout;
