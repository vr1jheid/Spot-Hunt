import { queryOptions } from "@tanstack/react-query";

export interface Sides {
  northLatitude: string;
  southLatitude: string;
  westLongitude: string;
  eastLongitude: string;
}

export const pointOptions = (sides: Sides) =>
  queryOptions({
    queryKey: ["points", sides],
  });
