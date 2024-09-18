import { Map } from "mapbox-gl";

export const getBounds = (map: Map) => {
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
