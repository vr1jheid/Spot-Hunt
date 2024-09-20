import { Button, FileButton } from "@mantine/core";
import { useState } from "react";
import { Photo } from "shared/model/photoTypes";
import { PhotosList } from "shared/ui/PhotosList/PhotosList";

interface SpotPhotosProps {
  onChange?: (photos: Photo[]) => void;
}

export const SpotPhotos = (props: SpotPhotosProps) => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  return (
    <div>
      <div className="w-fit">
        <FileButton
          accept="image/png,image/jpeg"
          multiple
          onChange={(photosInput) => {
            photosInput.slice(0, 3 - photos.length).forEach((file) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => {
                const url = reader.result?.toString();
                if (photos.find((p) => p.url === url)) return;
                if (url) {
                  setPhotos((prev) => {
                    const current = [...prev, { file, url }];
                    props.onChange && props.onChange(current);
                    return current;
                  });
                }
              };
            });
          }}
        >
          {(props) => (
            <Button size="compact-xs" color="pink" {...props}>
              Add photos
            </Button>
          )}
        </FileButton>
      </div>

      <PhotosList
        items={photos.map((p) => p.url)}
        onDelete={(url?: string) =>
          setPhotos((prev) => {
            const current = prev.filter((p) => p.url !== url);
            props.onChange && props.onChange(current);
            return prev.filter((p) => p.url !== url);
          })
        }
      />
    </div>
  );
};
