import { Map } from "mapbox-gl";
import { Bounds } from "entities/map/model/map.types";

export const getBounds = (map: Map): Bounds => {
  const bounds = map.getBounds();
  if (!bounds) {
    throw new Error("Error getting bounds");
  }
  return {
    northLatitude: bounds.getNorth().toString(),
    southLatitude: bounds.getSouth().toString(),
    westLongitude: bounds.getWest().toString(),
    eastLongitude: bounds.getEast().toString(),
  };
};
