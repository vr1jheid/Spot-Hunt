export interface SpotServerData {
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

export interface SpotLocalData extends Omit<SpotServerData, "coordinates"> {
  coordinates: {
    lng: number;
    lat: number;
  };
}

export interface SpotDataToSend
  extends Omit<SpotServerData, "id" | "images" | "coordinates"> {
  longitude: string;
  latitude: string;
}
