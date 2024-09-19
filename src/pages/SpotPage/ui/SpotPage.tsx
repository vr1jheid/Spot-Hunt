import { Loader } from "@mantine/core";
import { useMap } from "entities/MapContext";
import { useSpot } from "entities/parkingSpot/lib/hooks/useSpot";
import mapboxgl, { Marker } from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import { useNavigate, useParams } from "react-router-dom";
import { BottomSheet } from "react-spring-bottom-sheet";
import { ParkingMarker } from "shared/ui/ParkingMarker/ParkingMarker";
import { SpotDetails } from "widgets/SpotDetails";

export const SpotPage = () => {
  const { id } = useParams() as { id: string };
  const { spotData, isFetching } = useSpot(id);

  console.log("isFetching", isFetching);

  const navigate = useNavigate();

  const [open, setOpen] = useState(true);

  const marker = useRef<Marker | null>(null);
  const { mapRef } = useMap();

  useEffect(() => {
    if (!spotData || !mapRef.current || marker.current) {
      return;
    }

    const markerContainer = document.createElement("div");
    ReactDOM.createRoot(markerContainer).render(
      <ParkingMarker color="green" />,
    );
    marker.current = new mapboxgl.Marker(markerContainer)
      .setLngLat(spotData?.coordinates)
      .addTo(mapRef.current);

    () => {
      marker.current?.remove();
    };
  }, [spotData]);

  useEffect(() => {
    if (!spotData) return;
    mapRef.current?.easeTo({
      center: {
        lat: spotData.coordinates.lat - 0.003,
        lng: spotData.coordinates.lng,
      },
      zoom: 15,
    });
  }, [spotData]);

  return (
    <BottomSheet
      onSpringStart={(e) => {
        if (e.type === "CLOSE") {
          setTimeout(() => {
            navigate(-1);
          }, 400);
        }
      }}
      open={open}
      onDismiss={() => {
        setOpen(false);
        marker.current?.remove();
        marker.current = null;
      }}
      header={<div className="h-6 rounded-t-lg bg-white"></div>}
      expandOnContentDrag
    >
      {!spotData ? (
        <div className="flex h-80 w-full items-center justify-center bg-transparent">
          <Loader type="bars" />
        </div>
      ) : (
        <SpotDetails {...spotData} isFetching={isFetching} />
      )}
    </BottomSheet>
  );
};
