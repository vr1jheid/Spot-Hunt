import { useUserStore } from "entities/user";
import { API_URL } from "shared/api/constants";
import { Photo } from "shared/model/photo.types";

import { getFetchOptions } from "../../config/fetchOptions";

export const addPhotoToSpot = async ({
  id,
  photoData,
}: {
  id: number;
  photoData: Photo[];
}) => {
  const { id: userID } = useUserStore.getState();

  if (!userID) {
    throw new Error("Can`t get user id");
  }
  const formData = new FormData();

  photoData.forEach(({ url, file }) => {
    formData.append(url, file);
  });

  const response = await fetch(`${API_URL}/api/park-point/upload-image/${id}`, {
    method: "POST",
    body: formData,
    ...getFetchOptions(),
  });
  const responseJson = await response.json();

  return responseJson;
};
