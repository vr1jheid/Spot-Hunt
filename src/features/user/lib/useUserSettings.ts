import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";
import { UserTypes } from "entities/user";
import { queryClient } from "shared/lib/queryClient";

import { fetchUserSettings } from "../api/fetchUserSettings";
import { updateUserSettings } from "../api/updateUserSettings";

interface UseUserSettingsProps {
  mutationOptions: Omit<
    UseMutationOptions<any, Error, UserTypes.UserSettings, unknown>,
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
