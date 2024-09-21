import mapboxgl from "mapbox-gl";
import ReactDOM from "react-dom/client";
import { Coords } from "shared/model/coords.types";

import { ParkingMarker } from "../../../shared/ui/ParkingMarker/ParkingMarker";
import { Markers } from "../model/types";

interface SpotShort {
  id: number;
  coordinates: Coords;
}

export type MarkerOnClick = (e: MouseEvent, spot: SpotShort) => void;

export const createMarkers = (
  spots: SpotShort[],
  options?: {
    color?: string;
    onClick?: MarkerOnClick;
  },
) => {
  const markers: Markers = {};
  spots.forEach((spot) => {
    const { id, coordinates } = spot;
    const markerContainer = document.createElement("div");
    ReactDOM.createRoot(markerContainer).render(
      <ParkingMarker color={options?.color ?? "blue"} />,
    );

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
