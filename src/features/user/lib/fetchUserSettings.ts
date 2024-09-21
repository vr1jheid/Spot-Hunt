import { UserTypes } from "entities/user";
import { getFetchOptions } from "features/parkingSpot/config/fetchOptions";
import { ServerResponse } from "shared/api/types";

export const fetchUserSettings = async () => {
  const resp = await fetch(
    "https://cert-spothunt.playnrolls.online/api/user-setting",
    getFetchOptions(),
  );

  if (!resp.ok) {
    throw new Error("Error fetching settings");
  }

  const settings =
    (await resp.json()) as ServerResponse<UserTypes.UserSettings>;

  return settings.data;
};
