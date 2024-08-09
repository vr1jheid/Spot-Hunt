import { PointLocalData, PointServerData } from "../Types/PointData";
import { API_URL } from "./Constants/constants";

export const mockPoints = [
  {
    id: 22,
    title: "cypRUS",
    images: [],
    coordinates: {
      latitude: "34.994752",
      longitude: "33.013597",
    },
    capacity: null,
    rate: null,
  },
  {
    id: 23,
    title: "test1",
    images: [],
    coordinates: {
      latitude: "35.139900",
      longitude: "33.421029",
    },
    capacity: null,
    rate: null,
  },
  {
    id: 24,
    title: "test2",
    images: [],
    coordinates: {
      latitude: "35.035902",
      longitude: "33.858893",
    },
    capacity: 32,
    rate: 444,
  },
  {
    id: 25,
    title: "gfgf",
    images: [],
    coordinates: {
      latitude: "35.165177",
      longitude: "33.078456",
    },
    capacity: 21,
    rate: 33,
  },
  {
    id: 26,
    title: "some place",
    images: [],
    coordinates: {
      latitude: "34.899812",
      longitude: "33.304238",
    },
    capacity: 21,
    rate: 21,
  },
  {
    id: 27,
    title: "dsdsa",
    images: [],
    coordinates: {
      latitude: "34.997942",
      longitude: "32.315267",
    },
    capacity: null,
    rate: null,
  },
  {
    id: 30,
    title: "fdfdfggfg",
    images: [],
    coordinates: {
      latitude: "35.044799",
      longitude: "33.762040",
    },
    capacity: null,
    rate: null,
  },
  {
    id: 31,
    title: "fdsfdsfds",
    images: [],
    coordinates: {
      latitude: "34.880928",
      longitude: "32.826220",
    },
    capacity: null,
    rate: null,
  },
  {
    id: 32,
    title: "qqqqqq",
    images: [],
    coordinates: {
      latitude: "34.843035",
      longitude: "32.538052",
    },
    capacity: null,
    rate: null,
  },
  {
    id: 34,
    title: "ХВОСТ",
    images: [],
    coordinates: {
      latitude: "35.674775",
      longitude: "34.540559",
    },
    capacity: null,
    rate: null,
  },
  {
    id: 35,
    title: "new1",
    images: [],
    coordinates: {
      latitude: "35.082553",
      longitude: "32.685680",
    },
    capacity: null,
    rate: null,
  },
  {
    id: 36,
    title: "xzcx",
    images: [],
    coordinates: {
      latitude: "35.328196",
      longitude: "33.718095",
    },
    capacity: null,
    rate: null,
  },
  {
    id: 37,
    title: "WITH RATE",
    images: [],
    coordinates: {
      latitude: "35.054165",
      longitude: "33.198924",
    },
    capacity: 3232,
    rate: 2121,
  },
] as PointServerData[];

export const fetchPoints = async ({
  params,
}: {
  params: { [key in string]: string };
}): Promise<PointLocalData[]> => {
  const url = new URL(`${API_URL}/api/park-point/`);
  params &&
    Object.entries(params).forEach(([name, value]) => {
      url.searchParams.set(name, value);
    });

  /*   const response = await fetch(url, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
  if (!response.ok) {
    throw new Error("Api response error");
  }
  const data = await response.json();
  const serverData = data.data.items as PointServerData[]; */

  return mockPoints.map((p) => {
    return {
      ...p,
      coordinates: {
        lng: +p.coordinates.longitude,
        lat: +p.coordinates.latitude,
      },
    };
  });
};
