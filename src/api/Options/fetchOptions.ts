import { useUserStore } from "../../Store/userStore";

export const getFetchOptions = () => {
  const userID = useUserStore.getState().id;
  if (!userID) {
    throw new Error(`User id error ${userID}`);
  }
  return {
    headers: {
      "tt-auth-token": useUserStore.getState().id ?? "",
    },
  };
};
