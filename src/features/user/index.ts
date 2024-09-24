import { fetchUserSettings } from "./api/fetchUserSettings";
import { updateUserSettings } from "./api/updateUserSettings";

export { useUserSettings } from "./lib/useUserSettings";

export const userAPI = {
  fetchUserSettings,
  updateUserSettings,
};
