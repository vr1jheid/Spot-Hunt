import { MapContext } from "entities/map/config/MapContext";
import { SpotTypes } from "entities/parkingSpot";
import { useUserStore } from "entities/user";
import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Markers } from "widgets/Map/model/map.types";

import { createMarkersOnMap } from "../createMarkersOnMap";
import { changePulsingDotLocation } from "../PulsingDot/changePulsingDotLocation";
import { createPulsingDotOnMap } from "../PulsingDot/createPulsingDotOnMap";
import { USER_LOCATION_DOT_ID } from "../PulsingDot/PulsingDotConstants";

interface Props {
  spots: SpotTypes.SpotLocalBrief[];
  unapproved?: SpotTypes.SpotLocalBrief[];
}

export const useMapMarkers = ({ spots /* , unapproved  */ }: Props) => {
  const navigate = useNavigate();
  const markers = useRef<Markers>({});
  /*   const unapprovedSpotsMarkers = useRef<Markers>({}); */
  const { mapRef } = useContext(MapContext);
  const { location } = useUserStore();

  const onMarkerClick = (e: MouseEvent, spot: SpotTypes.SpotLocalBrief) => {
    e.stopPropagation();
    navigate(`spot/${spot.id}`);
  };

  /*   useEffect(() => {
    if (!unapproved || !mapRef.current) return;
    Object.values(unapprovedSpotsMarkers.current).forEach((m) => m.remove());

    const newMarkers = createMarkersOnMap(unapproved, {
      color: "gray",
      onClick: onMarkerClick,
    });
    Object.values(newMarkers).forEach((m) => m.addTo(mapRef.current!));
    unapprovedSpotsMarkers.current = newMarkers;
  }, [unapproved]); */

  useEffect(() => {
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
    const newMarkers = createMarkersOnMap(spotsToMark, {
      onClick: onMarkerClick,
    });

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
