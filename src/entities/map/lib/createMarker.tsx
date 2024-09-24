import ReactDOM from "react-dom/client";
import { ParkingMarker } from "shared/ui/ParkingMarker/ParkingMarker";

import { MarkerType } from "../model/map.types";

export const createMarker = (type: MarkerType) => {
  const markerContainer = document.createElement("div");
  ReactDOM.createRoot(markerContainer).render(<ParkingMarker type={type} />);
  return markerContainer;
};
