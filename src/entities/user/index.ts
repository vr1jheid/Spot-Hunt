import { fetchUserSettings } from "../../features/user/lib/fetchUserSettings";
import { updateUserSettings } from "../../features/user/lib/updateUserSettings";

export * as UserTypes from "./model/user.types";
export { useUserStore } from "./model/userStore";

export const userAPI = {
  fetchUserSettings,
  updateUserSettings,
};
