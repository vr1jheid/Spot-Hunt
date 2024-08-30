import mapboxgl from "mapbox-gl";
import { useContext, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import { useNavigate } from "react-router-dom";

import { useUserStore } from "../../../Store/userStore";
import { SpotLocalData } from "../../../Types/PointTypes";
import { USER_LOCATION_DOT_ID } from "../Constants/pulsingDot";
import { MapBoxContext } from "../Context/MapBoxContext";
import { ParkingMarker } from "../ParkingMarker/ParkingMarker";
import { Markers } from "../Types/Markers";
import { changePulsingDotLocation } from "../Utils/changePulsingDotLocation";
import { createPulsingDotOnMap } from "../Utils/createPulsingDotOnMap";

export const useMapMarkers = (spots: SpotLocalData[]) => {
  const navigate = useNavigate();
  const markers = useRef<Markers>({});
  const { mapRef } = useContext(MapBoxContext);
  const { location } = useUserStore();

  useEffect(() => {
    if (!mapRef.current || !spots) return;
    const markersCopy = { ...markers.current };

    const newMarkers: Markers = {};
    const currentSpotsIds = spots.map(({ id }) => id);
    Object.keys(markers.current).forEach((id) => {
      if (!currentSpotsIds.includes(+id)) {
        markersCopy[id].remove();
        delete markersCopy[id];
      }
    });

    spots.forEach(({ id, coordinates }) => {
      if (markers.current[id]) return;
      const markerContainer = document.createElement("div");
      ReactDOM.createRoot(markerContainer).render(
        <ParkingMarker color="blue" />
      );

      const marker = new mapboxgl.Marker(markerContainer)
        .setLngLat(coordinates)
        .addTo(mapRef.current);
      console.log(marker.getElement());
      marker.getElement().setAttribute("data-marker", "true");
      marker.getElement().addEventListener("click", (e) => {
        e.stopPropagation();
        navigate(`spot/${id}`);
      });
      newMarkers[id] = marker;
    });

    markers.current = { ...markersCopy, ...newMarkers };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
