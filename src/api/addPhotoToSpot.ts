import { useUserStore } from "../Store/userStore";
import { API_URL } from "./Constants/constants";
import { getFetchOptions } from "./Options/fetchOptions";

export const addPhotoToSpot = async ({
  id,
  photoData,
}: {
  id: number;
  photoData: { key: string; photo: File }[];
}) => {
  const { id: userID } = useUserStore.getState();
  if (!userID) {
    console.error("Can`t get user id");
    throw new Error("Can`t get user id");
  }
  const formData = new FormData();
  photoData.forEach(({ key, photo }) => {
    console.log({ key, photo });

    formData.append(key, photo);
  });

  const response = await fetch(`${API_URL}/api/park-point/upload-image/${id}`, {
    method: "POST",
    body: formData,
    ...getFetchOptions(),
  });
  const responseJson = await response.json();

  return responseJson;
};
