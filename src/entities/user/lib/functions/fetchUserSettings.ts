import { getFetchOptions } from "entities/parkingSpot/config/fetchOptions";
import { ServerResponse, UserSettings } from "shared/api/types";

export const fetchUserSettings = async () => {
  const resp = await fetch(
    "https://cert-spothunt.playnrolls.online/api/user-setting",
    getFetchOptions(),
  );

  if (!resp.ok) {
    throw new Error("Error fetching settings");
  }

  const settings = (await resp.json()) as ServerResponse<UserSettings>;

  return settings.data;
};
