import { getFetchOptions } from "../Options/fetchOptions";
import { UserSettings } from "../Types/types";

export const updateUserSettings = async (settings: UserSettings) => {
  const resp = await fetch(
    "https://cert-spothunt.playnrolls.online/api/user-setting/update",
    {
      method: "POST",
      body: JSON.stringify(settings),
      headers: {
        "Content-type": "application/json",
        ...getFetchOptions().headers,
      },
    }
  );

  if (!resp.ok) {
    throw new Error("Error updating settings");
  }

  return await resp.json();
};
