import { useContext } from "react";

import { MapContext } from "../../map/config/MapContext";

export const useMap = () => {
  return useContext(MapContext);
};
