import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useUserStore } from "../../../Store/userStore";
import { LocalCoords, SpotLocalBrief } from "../../../Types/SpotTypes";
import { USER_LOCATION_DOT_ID } from "../Constants/pulsingDot";
import { MapBoxContext } from "../Context/MapBoxContext";
import { Markers } from "../Types/Markers";
import { changePulsingDotLocation } from "../Utils/changePulsingDotLocation";
import { createMarkers } from "../Utils/createMarkers";
import { createPulsingDotOnMap } from "../Utils/createPulsingDotOnMap";

interface Props {
  spots: SpotLocalBrief[];
  unapproved?: SpotLocalBrief[];
}

export const useMapMarkers = ({ spots, unapproved }: Props) => {
  const navigate = useNavigate();
  const markers = useRef<Markers>({});
  const unapprovedSpotsMarkers = useRef<Markers>({});
  const { mapRef } = useContext(MapBoxContext);
  const { location } = useUserStore();

  const onMarkerClick = (
    e: MouseEvent,
    spot: { id: number; coordinates: LocalCoords }
  ) => {
    e.stopPropagation();
    navigate(`spot/${spot.id}`);
  };

  useEffect(() => {
    if (!unapproved || !mapRef.current) return;
    console.log("adding unaproved to map");
    Object.values(unapprovedSpotsMarkers.current).forEach((m) => m.remove());

    const newMarkers = createMarkers(unapproved, {
      color: "gray",
      onClick: onMarkerClick,
    });
    Object.values(newMarkers).forEach((m) => m.addTo(mapRef.current!));
    unapprovedSpotsMarkers.current = newMarkers;
  }, [unapproved]);

  useEffect(() => {
    console.log("marker effect");
    if (!mapRef.current || !spots) return;
    const markersCopy = { ...markers.current };
    const currentSpotsIds = spots.map(({ id }) => id);

    Object.keys(markers.current).forEach((id) => {
      if (!currentSpotsIds.includes(+id)) {
        markersCopy[id].remove();
        delete markersCopy[id];
      }
    });

    const spotsToMark = spots.filter(({ id }) => !markersCopy[id]);
    const newMarkers = createMarkers(spotsToMark, {
      onClick: onMarkerClick,
    });
    console.log(newMarkers, mapRef.current);

    Object.values(newMarkers).forEach((m) => m.addTo(mapRef.current!));
    markers.current = { ...markers.current, ...newMarkers };

    markers.current = { ...markersCopy, ...newMarkers };
  }, [spots, navigate]);

  useEffect(() => {
    if (!mapRef.current || !location) return;

    const dot = mapRef.current.getSource(USER_LOCATION_DOT_ID);
    if (dot) {
      changePulsingDotLocation(mapRef.current, location);
    } else {
      createPulsingDotOnMap(mapRef.current, location);
    }
  }, [location]);
};
