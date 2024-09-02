import { API_URL } from "./Constants/constants";

export const addPhotoToSpot = async ({
  id,
  photoData,
}: {
  id: number;
  photoData: { key: string; photo: File }[];
}) => {
  const formData = new FormData();
  photoData.forEach(({ key, photo }) => {
    console.log({ key, photo });

    formData.append(key, photo);
  });

  const response = await fetch(`${API_URL}/api/park-point/upload-image/${id}`, {
    method: "POST",
    headers: {
      "tt-auth-token": window.btoa("1488"),
    },
    body: formData,
  });
  const responseJson = await response.json();

  return responseJson;
};
