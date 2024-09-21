import { Map } from "mapbox-gl";
import { Coords } from "shared/model/coords.types";

import { USER_LOCATION_DOT_ID } from "./PulsingDotConstants";

interface Options {
  size: number;
}

export const createPulsingDotOnMap = (
  map: Map,
  { lng, lat }: Coords,
  { size }: Options = { size: 100 },
) => {
  const canvas = document.createElement("canvas");

  const pulsingDot = {
    width: size,
    height: size,
    data: new Uint8ClampedArray(size * size * 4),
    context: canvas.getContext("2d")!,

    onAdd: function () {
      canvas.width = this.width;
      canvas.height = this.height;
    },

    render: function () {
      const duration = 1000;
      const t = (performance.now() % duration) / duration;

      const radius = (size / 2) * 0.3;
      const outerRadius = (size / 2) * 0.7 * t + radius;
      const context = this.context;

      context.clearRect(0, 0, this.width, this.height);
      context.beginPath();
      context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
      context.fillStyle = `rgba(255, 200, 200, ${1 - t})`;
      context.fill();

      context.beginPath();
      context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
      context.fillStyle = "rgba(255, 100, 100, 1)";
      context.strokeStyle = "white";
      context.lineWidth = 2 + 4 * (1 - t);
      context.fill();
      context.stroke();

      this.data = context.getImageData(0, 0, this.width, this.height).data;

      map?.triggerRepaint();

      return true;
    },
  };
  map.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 });
  map.addSource(USER_LOCATION_DOT_ID, {
    type: "geojson",
    data: {
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
    },
  });
  map.addLayer({
    id: "layer-with-pulsing-dot",
    type: "symbol",
    source: USER_LOCATION_DOT_ID,
    layout: {
      "icon-image": "pulsing-dot",
    },
  });
};
