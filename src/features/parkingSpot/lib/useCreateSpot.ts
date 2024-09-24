import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Photo } from "shared/model/photo.types";

import { spotsAPI } from "..";
import { addPhotoToSpot } from "../api/addPhotoToSpot";
import { addSpot } from "../api/addSpot";

export const useCreateSpot = () => {
  const photosRef = useRef<Photo[]>([]);
  const navigate = useNavigate();
  const setPhotos = (photos: Photo[]) => (photosRef.current = photos);

  const { mutate: mutatePhotos, ...photosMutationInfo } = useMutation({
    mutationFn: addPhotoToSpot,
    onSuccess: ({ data }) => {
      spotsAPI.invalidateSpots();
      spotsAPI.invalidateSpot(`${data.id}`);
    },
  });

  const pointMutation = useMutation({
    mutationFn: addSpot,
    onSuccess: async ({ data }) => {
      spotsAPI.invalidateSpots();
      navigate("/");

      if (photosRef.current.length) {
        const photoData = photosRef.current.map((p) => {
          return { ...p, key: p.url };
        });
        mutatePhotos({ id: data.id, photoData });
      }
    },
  });

  return {
    setPhotos,
    pointMutation,
    photosMutationInfo,
  };
};
