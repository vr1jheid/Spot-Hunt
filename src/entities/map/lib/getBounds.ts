import { Bounds } from "entities/map/model/map.types";
import { Map } from "mapbox-gl";

export const getBounds = (map: Map): Bounds => {
  /* 1 km */
  const latIncrease = 0.009;
  const lngIncrease = 0.011;

  const bounds = map.getBounds();
  if (!bounds) {
    throw new Error("Error getting bounds");
  }
  return {
    northLatitude: (bounds.getNorth() + latIncrease * 3).toString(),
    southLatitude: (bounds.getSouth() - latIncrease * 3).toString(),
    westLongitude: (bounds.getWest() - lngIncrease * 3).toString(),
    eastLongitude: (bounds.getEast() + lngIncrease * 3).toString(),
  };
};
