import { Map } from "mapbox-gl";
import { Coords } from "shared/model/coords";

export const changePulsingDotLocation = (map: Map, { lng, lat }: Coords) => {
  const dot = map.getSource("dot-point") as mapboxgl.GeoJSONSource;
  if (!dot) {
    throw new Error("Dot not found on map");
  }
  dot.setData({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: [lng, lat],
        },
      },
    ],
  });
};
