import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";
import { UserSettings } from "shared/api/types";
import { queryClient } from "shared/lib/queryClient";

import { fetchUserSettings } from "../functions/fetchUserSettings";
import { updateUserSettings } from "../functions/updateUserSettings";

interface UseUserSettingsProps {
  mutationOptions: Omit<
    UseMutationOptions<any, Error, UserSettings, unknown>,
    "mutationFn" | "mutationKey"
  >;
}

export const useUserSettings = (options?: UseUserSettingsProps) => {
  const { data: settings, ...queryData } = useQuery({
    queryKey: ["settings"],
    queryFn: fetchUserSettings,
  });

  const mutation = useMutation({
    mutationFn: updateUserSettings,
    ...options?.mutationOptions,
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["settings"] });

  return {
    settings,
    invalidate,
    mutation,
    ...queryData,
  };
};
