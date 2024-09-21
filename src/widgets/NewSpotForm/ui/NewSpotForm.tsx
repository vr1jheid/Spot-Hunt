import {
  Button,
  CloseButton,
  LoadingOverlay,
  NumberInput,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCashBanknote } from "@tabler/icons-react";
import { SpotTypes } from "entities/parkingSpot";
import { useCreateSpot } from "features/parkingSpot";
import { ForwardedRef, forwardRef } from "react";
import { useNavigate } from "react-router-dom";

import { SpotPhotos } from "./SpotPhotos";

interface NewSpotFormProps {
  coords: string[];
}

export const NewSpotForm = forwardRef(
  ({ coords }: NewSpotFormProps, ref: ForwardedRef<HTMLFormElement>) => {
    const [longitude, latitude] = coords;
    const navigate = useNavigate();
    const closeForm = () => navigate("/");
    const { pointMutation, setPhotos } = useCreateSpot();

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

      const dataToSend: SpotTypes.SpotDataToSend = {
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
        <SpotPhotos onChange={(p) => setPhotos(p)} />
        <Button size="sm" type="submit">
          Save
        </Button>
      </form>
    );
  },
);
