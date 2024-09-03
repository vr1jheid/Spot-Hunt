import { Loader } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import mapboxgl, { Marker } from "mapbox-gl";
import { useContext, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import { useNavigate, useParams } from "react-router-dom";
import { BottomSheet } from "react-spring-bottom-sheet";

import { fetchSpotData } from "../../api/fetchSpotData";
import { MapBoxContext } from "../../Components/MapBox/Context/MapBoxContext";
import { ParkingMarker } from "../../Components/MapBox/ParkingMarker/ParkingMarker";
import { SpotDetails } from "../../Components/SpotDetails/SpotDetails";
import { SpotLocalData } from "../../Types/SpotTypes";

export const SpotPage = () => {
  const { id } = useParams() as { id: string };
  const { data: spotData, isFetching } = useQuery<SpotLocalData>({
    queryKey: ["spots", id],
    queryFn: async () => await fetchSpotData(id),
  });
  console.log("isFetching", isFetching);

  const navigate = useNavigate();

  const [open, setOpen] = useState(true);

  const marker = useRef<Marker | null>(null);
  const { mapRef } = useContext(MapBoxContext);

  useEffect(() => {
    if (!spotData || !mapRef.current || marker.current) {
      return;
    }

    const markerContainer = document.createElement("div");
    ReactDOM.createRoot(markerContainer).render(
      <ParkingMarker color="green" />
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
      header={<div className="h-6 bg-white rounded-t-lg"></div>}
      expandOnContentDrag
      /*     blocking={false} */
    >
      {!spotData ? (
        <div className="bg-transparent w-full h-80 flex justify-center items-center">
          <Loader type="bars" />
        </div>
      ) : (
        <SpotDetails {...spotData} isFetching={isFetching} />
      )}
    </BottomSheet>
  );
};
