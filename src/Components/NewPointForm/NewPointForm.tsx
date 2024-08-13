import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  CloseButton,
  FileButton,
  LoadingOverlay,
  NumberInput,
  TextInput,
} from "@mantine/core";
import { IconCurrencyDollar } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { addPoint } from "../../api/addPoint";
import { useClickOutside } from "@mantine/hooks";
import { PointDataToSend } from "../../Types/PointData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { API_URL } from "../../api/Constants/constants";
import { addPhotoToPoint } from "../../api/addPhotoToPoint";

export const NewPointForm = () => {
  const [photos, setPhotos] = useState<{ photo: File; url: string }[]>([]);
  const navigate = useNavigate();
  const closeForm = () => navigate(-1);
  const { coords } = useParams() as { coords: string };
  const [longitude, latitude] = coords.split(",");

  const queryClient = useQueryClient();

  const addPhotoMutation = useMutation({
    mutationFn: addPhotoToPoint,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["points"] });
      console.log(res);
    },
  });

  const addPointMutation = useMutation({
    mutationFn: addPoint,
    onSuccess: async ({ data }) => {
      console.log("Point added", data);
      queryClient.invalidateQueries({ queryKey: ["points"] });
      closeForm();
      const photoData = photos.map((p) => {
        return { ...p, key: p.url };
      });
      addPhotoMutation.mutate({ id: data.id, photoData });
    },
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

  const ref = useClickOutside(closeForm);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationResult = form.validate();
    if (validationResult.hasErrors) return;
    const formValues = form.getValues();
    console.log(formValues);

    const dataToSend: PointDataToSend = {
      ...formValues,
      longitude,
      latitude,
    };
    addPointMutation.mutate(dataToSend);
  };
  return (
    <form
      ref={ref}
      onSubmit={onSubmit}
      className="w-full sm:w-[500px] h-fit flex flex-col gap-7 bg-white rounded-lg p-6 relative"
    >
      <LoadingOverlay
        visible={addPointMutation.isPending}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <header className="flex justify-between items-center font-medium">
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
        leftSection={<IconCurrencyDollar />}
        key={form.key("rate")}
        {...form.getInputProps("rate")}
      />
      <div>
        <div className="w-14">
          <FileButton
            accept="image/png,image/jpeg"
            onChange={(photo) => {
              if (!photo) return;
              /*  setPhotos((prev) => [...prev, photo]); */

              const reader = new FileReader();
              reader.readAsDataURL(photo);
              reader.onloadstart = (e) => {
                console.log(reader.result);
              };
              reader.onprogress = (e) => {
                console.log(e.loaded, e.total);
              };
              reader.onload = (e) => {
                const url = reader.result?.toString();
                if (url) {
                  setPhotos((prev) => [...prev, { photo, url }]);
                }
              };
            }}
          >
            {(props) => (
              <Button size="compact-xs" color="pink" {...props}>
                Add photos
              </Button>
            )}
          </FileButton>
        </div>
      </div>

      <Button size="sm" type="submit">
        Save
      </Button>
      {photos.map(({ url }) => {
        return <img className="block w-24 h-24" src={url} />;
      })}
    </form>
  );
};
