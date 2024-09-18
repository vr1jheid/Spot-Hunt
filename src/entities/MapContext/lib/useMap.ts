import { useContext } from "react";

import { MapContext } from "../config/MapContext";

export const useMap = () => {
  return useContext(MapContext);
};
