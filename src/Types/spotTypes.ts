export interface ServerCoords {
  longitude: string;
  latitude: string;
}

export interface LocalCoords {
  lng: number;
  lat: number;
}

export interface SpotServerBrief {
  id: number;
  title: string;
  coordinates: ServerCoords;
  rate: number | null;
  capacity: number | null;
  mainImage: string;
}

export interface SpotLocalBrief extends Omit<SpotServerBrief, "coordinates"> {
  coordinates: {
    lng: number;
    lat: number;
  };
}

export interface SpotServerData extends SpotServerBrief {
  images: string[];
  votedFor: number;
  votedAgainst: number;
}

export interface SpotLocalData extends Omit<SpotServerData, "coordinates"> {
  coordinates: LocalCoords;
  voteCode: number;
}

export interface SpotDataToSend
  extends Omit<SpotServerBrief, "id" | "mainImage" | "coordinates"> {
  longitude: string;
  latitude: string;
}
