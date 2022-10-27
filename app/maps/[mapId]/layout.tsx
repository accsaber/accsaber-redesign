import React from "react";
import MapHeader from "../Components/MapHeader";

const MapLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { mapId: string };
}) => {
  return (
    <>
      <MapHeader mapId={params.mapId} />

      {children}
    </>
  );
};

export default MapLayout;
