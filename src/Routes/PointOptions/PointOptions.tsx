import { Button } from "@mantine/core";
import mapboxgl from "mapbox-gl";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BottomSheet } from "react-spring-bottom-sheet";

import { MapBoxContext } from "../../Components/MapBox/Context/MapBoxContext";

export const PointOptions = () => {
  const { mapRef } = useContext(MapBoxContext);
  const navigate = useNavigate();
  const { coords } = useParams() as { coords: string };
  const [lng, lat] = coords.split(",").map((c) => +c);

  useEffect(() => {
    if (!mapRef.current) return;
    const tempMarker = new mapboxgl.Marker({ color: "red" })
      .setLngLat({ lng, lat })
      .addTo(mapRef.current);
    return () => {
      tempMarker.remove();
    };
  }, []);

  return (
    <BottomSheet
      open
      onDismiss={() => {
        navigate("/");
      }}
    >
      <ul className="p-2">
        <li className="w-full">
          <Button
            fullWidth
            onClick={() => {
              navigate(`/new-spot/${coords}`);
            }}
            classNames={{ label: "w-full flex justify-between" }}
          >
            <span className="grow">Add new spot</span>
          </Button>
        </li>
      </ul>
    </BottomSheet>
  );
};
