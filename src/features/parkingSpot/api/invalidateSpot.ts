import { queryClient } from "shared/lib/queryClient";

export const invalidateSpot = (id: string) => {
  queryClient.invalidateQueries({ queryKey: ["spots", id] });
};
