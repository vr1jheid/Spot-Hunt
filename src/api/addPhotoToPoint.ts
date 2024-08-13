import { API_URL } from "./Constants/constants";

export const addPhotoToPoint = async ({
  id,
  photoData,
}: {
  id: number;
  photoData: { key: string; photo: File }[];
}) => {
  console.log("adding photo");
  const fetchPointData = await fetch(`${API_URL}/api/park-point/${id}`);
  console.log(fetchPointData);

  const formData = new FormData();
  photoData.forEach(({ key, photo }) => {
    formData.append(key, photo);
  });
  const response = await fetch(`${API_URL}/api/park-point/upload-image/${id}`, {
    method: "POST",
    body: formData,
  });
  console.log(response);

  const responseJson = await response.json();
  console.log(responseJson);

  return responseJson;
};
