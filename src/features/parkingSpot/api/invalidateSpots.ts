import { queryClient } from "shared/lib/queryClient";

export const invalidateSpots = () =>
  queryClient.invalidateQueries({ queryKey: ["spots"] });
