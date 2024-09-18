import { queryClient } from "./queryClient";

export const invalidateSpots = () =>
  queryClient.invalidateQueries({ queryKey: ["spots"] });
