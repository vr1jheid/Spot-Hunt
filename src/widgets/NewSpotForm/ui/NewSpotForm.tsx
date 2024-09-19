import {
  Button,
  CloseButton,
  FileButton,
  LoadingOverlay,
  NumberInput,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCashBanknote } from "@tabler/icons-react";
import { useCreateSpot } from "entities/parkingSpot/lib/hooks/useCreateSpot";
import { ForwardedRef, forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Photo } from "shared/model/photoTypes";

import { SpotDataToSend } from "../../../shared/model/spotTypes";
import { PhotosList } from "../../../shared/ui/PhotosList/PhotosList";

interface Props {
  coords: string[];
}

export const NewSpotForm = forwardRef(
  ({ coords }: Props, ref: ForwardedRef<HTMLFormElement>) => {
    const [longitude, latitude] = coords;
    const [photos, setPhotos] = useState<Photo[]>([]);
    const navigate = useNavigate();
    const closeForm = () => navigate("/");
    const { pointMutation } = useCreateSpot({
      photos,
      onSuccess: () => closeForm(),
    });

    const form = useForm({
      mode: "uncontrolled",
      initialValues: {
        title: "",
        capacity: null,
        rate: null,
      },
      validate: {
        title: (value) =>
          value.length < 4 ? "Spot name must be at least 4 chars" : null,
      },
    });

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const validationResult = form.validate();
      if (validationResult.hasErrors) return;
      const formValues = form.getValues();
      console.log(formValues);

      const dataToSend: SpotDataToSend = {
        ...formValues,
        longitude,
        latitude,
      };
      pointMutation.mutate(dataToSend);
    };
    return (
      <form
        ref={ref}
        onSubmit={onSubmit}
        className="relative flex h-fit w-full flex-col gap-5 rounded-lg bg-white p-6 sm:w-[500px]"
      >
        <LoadingOverlay
          visible={pointMutation.isPending}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <header className="flex items-center justify-between font-medium">
          Add a spot <CloseButton onClick={closeForm} size="lg" />
        </header>
        <TextInput
          label="Title"
          placeholder="e.g. Union square"
          withAsterisk
          key={form.key("title")}
          {...form.getInputProps("title")}
        />
        <NumberInput
          label="Capacity"
          placeholder="e.g. 20"
          min={0}
          key={form.key("capacity")}
          {...form.getInputProps("capacity")}
        />
        <NumberInput
          label="Rate per hr"
          placeholder="e.g. 15$"
          min={0}
          leftSection={<IconCashBanknote />}
          key={form.key("rate")}
          {...form.getInputProps("rate")}
        />
        <div>
          <div className="w-fit">
            <FileButton
              accept="image/png,image/jpeg"
              multiple
              onChange={(photosInput) => {
                console.log(photos);

                photosInput.slice(0, 3 - photos.length).forEach((file) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = () => {
                    const url = reader.result?.toString();
                    if (photos.find((p) => p.url === url)) return;
                    if (url) {
                      setPhotos((prev) => [...prev, { file, url }]);
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
              setPhotos((prev) => prev.filter((p) => p.url !== url))
            }
          />
        </div>

        <Button size="sm" type="submit">
          Save
        </Button>
      </form>
    );
  },
);
