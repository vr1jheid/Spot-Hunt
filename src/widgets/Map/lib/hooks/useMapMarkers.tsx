import { MapContext } from "entities/MapContext/config/MapContext";
import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LocalCoords, SpotLocalBrief } from "shared/model/spotTypes";
import { useUserStore } from "shared/Store/userStore";
import { Markers } from "widgets/Map/model/types";

import { createMarkers } from "../createMarkers";
import { changePulsingDotLocation } from "../PulsingDot/changePulsingDotLocation";
import { createPulsingDotOnMap } from "../PulsingDot/createPulsingDotOnMap";
import { USER_LOCATION_DOT_ID } from "../PulsingDot/PulsingDotConstants";

interface Props {
  spots: SpotLocalBrief[];
  unapproved?: SpotLocalBrief[];
}

export const useMapMarkers = ({ spots, unapproved }: Props) => {
  const navigate = useNavigate();
  const markers = useRef<Markers>({});
  const unapprovedSpotsMarkers = useRef<Markers>({});
  const { mapRef } = useContext(MapContext);
  const { location } = useUserStore();

  const onMarkerClick = (
    e: MouseEvent,
    spot: { id: number; coordinates: LocalCoords },
  ) => {
    e.stopPropagation();
    navigate(`spot/${spot.id}`);
  };

  useEffect(() => {
    if (!unapproved || !mapRef.current) return;
    Object.values(unapprovedSpotsMarkers.current).forEach((m) => m.remove());

    const newMarkers = createMarkers(unapproved, {
      color: "gray",
      onClick: onMarkerClick,
    });
    Object.values(newMarkers).forEach((m) => m.addTo(mapRef.current!));
    unapprovedSpotsMarkers.current = newMarkers;
  }, [unapproved]);

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
    const newMarkers = createMarkers(spotsToMark, {
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
