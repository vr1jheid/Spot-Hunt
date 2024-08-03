import { useLocation, useNavigate } from "react-router-dom";
import { OverlayContainer } from "../../Components/OverlayContainer/OverlayContainer";
import { Button, CloseButton, NumberInput, TextInput } from "@mantine/core";
import { IconCurrencyDollar } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { Coords } from "../../Types/Сoords";
import { addPoint } from "../../api/addPoint";
import { useClickOutside } from "@mantine/hooks";

export const NewPointForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { coords: coordinates } = location.state as { coords: Coords };

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

  const closeForm = () => {
    navigate(-1);
  };
  const ref = useClickOutside(closeForm);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationResult = form.validate();
    if (validationResult.hasErrors) return;
    const formValues = form.getValues();
    console.log(formValues);

    const dataToSend = {
      ...formValues,
      coordinates,
    };
    console.log(dataToSend);

    addPoint(dataToSend);
  };
  return (
    <OverlayContainer>
      <div className="p-3 w-full h-full flex justify-center items-center">
        <form
          ref={ref}
          onSubmit={onSubmit}
          className="w-full sm:w-[500px] h-fit flex flex-col gap-7 bg-white rounded-lg p-6"
        >
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
          <Button size="sm" type="submit">
            Save
          </Button>
        </form>
      </div>
    </OverlayContainer>
  );
};
