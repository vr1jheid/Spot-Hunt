import { createMarker } from "entities/map/lib/createMarker";
import { SpotTypes } from "entities/parkingSpot";
import mapboxgl from "mapbox-gl";

import { Markers } from "../model/map.types";

export type MarkerOnClick = (
  e: MouseEvent,
  spot: SpotTypes.SpotLocalBrief,
) => void;

export const createMarkersOnMap = (
  spots: SpotTypes.SpotLocalBrief[],
  options?: {
    color?: string;
    onClick?: MarkerOnClick;
  },
) => {
  const markers: Markers = {};

  spots.forEach((spot) => {
    const { id, coordinates, isApproved } = spot;
    const type = isApproved ? "approved" : "standart";
    const markerContainer = createMarker(type);

    const marker = new mapboxgl.Marker(markerContainer).setLngLat(coordinates);
    marker.getElement().setAttribute("data-marker", "true");
    options?.onClick &&
      marker.getElement().addEventListener("click", (e) => {
        if (!options.onClick) return;
        options.onClick(e, spot);
      });
    markers[id] = marker;
  });

  return markers;
};
