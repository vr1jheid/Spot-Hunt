import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { invalidateSpots } from "shared/lib/invalidateSpots";
import { Photo } from "shared/model/photoTypes";

import { addPhotoToSpot } from "../functions/addPhotoToSpot";
import { addSpot } from "../functions/addSpot";

/* type MutationOptions = UseMutationOptions<
  any,
  Error,
  {
    id: number;
    photoData: Photo[];
  },
  unknown
>; */

interface UseCreateSpotProps {
  photos?: Photo[];
  onSuccess?: () => void;
}

export const useCreateSpot = (options?: UseCreateSpotProps) => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  const { mutate: mutatePhotos, isPending } = useMutation({
    mutationFn: addPhotoToSpot,
    onSuccess: () => {
      invalidateSpots();
    },
  });

  const pointMutation = useMutation({
    mutationFn: addSpot,
    onSuccess: async ({ data }) => {
      invalidateSpots();
      options?.onSuccess && options.onSuccess();

      if (options?.photos) {
        const { photos } = options;

        const photoData = photos.map((p) => {
          return { ...p, key: p.url };
        });
        mutatePhotos({ id: data.id, photoData });
      }
    },
  });

  /* const addPhoto = */

  return {
    pointMutation,
    photosInfo: {
      isPending,
    },
  };
};
