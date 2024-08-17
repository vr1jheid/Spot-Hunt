export interface PointServerData {
  id: number;
  title: string;
  coordinates: {
    longitude: string;
    latitude: string;
  };
  images: string[];
  rate: number | null;
  capacity: number | null;
}

export interface PointLocalData extends Omit<PointServerData, "coordinates"> {
  coordinates: {
    lng: number;
    lat: number;
  };
}

export interface PointDataToSend
  extends Omit<PointServerData, "id" | "images" | "coordinates"> {
  longitude: string;
  latitude: string;
}
