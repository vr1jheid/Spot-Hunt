import { queryClient } from "../Tanstack/queryClient";

export const invalidateSpots = () =>
  queryClient.invalidateQueries({ queryKey: ["spots"] });
