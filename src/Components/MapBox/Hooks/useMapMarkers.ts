import mapboxgl from "mapbox-gl";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUserStore } from "../../../Store/userStore";
import { SpotLocalData } from "../../../Types/PointTypes";
import { USER_LOCATION_DOT_ID } from "../Constants/pulsingDot";
import { MapBoxContext } from "../Context/MapBoxContext";
import { Markers } from "../Types/Markers";
import { changePulsingDotLocation } from "../Utils/changePulsingDotLocation";
import { createPulsingDotOnMap } from "../Utils/createPulsingDotOnMap";

export const useMapMarkers = (spots: SpotLocalData[]) => {
  const navigate = useNavigate();
  const [markers, setMarkers] = useState<Markers>({});
  const { map } = useContext(MapBoxContext);
  const { location } = useUserStore();

  useEffect(() => {
    if (!map || !spots) return;
    const markersCopy = { ...markers };

    const newMarkers: Markers = {};
    const currentSpotsIds = spots.map(({ id }) => id);
    Object.keys(markers).forEach((id) => {
      if (!currentSpotsIds.includes(+id)) {
        markersCopy[id].remove();
        delete markersCopy[id];
      }
    });

    spots.forEach(({ id, coordinates }) => {
      /* if (markersIds.includes(id)) return; */
      if (markers[id]) return;

      const marker = new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
      console.log(marker.getElement());
      marker.getElement().setAttribute("data-marker", "true");
      marker.getElement().addEventListener("click", (e) => {
        e.stopPropagation();
        navigate(`spot/${id}`);
      });
      newMarkers[id] = marker;
    });

    setMarkers({ ...markersCopy, ...newMarkers });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, spots, navigate]);

  useEffect(() => {
    if (!map || !location) return;

    const dot = map.getSource(USER_LOCATION_DOT_ID);
    if (dot) {
      changePulsingDotLocation(map, location);
    } else {
      createPulsingDotOnMap(map, location);
    }
  }, [location, map]);
};
