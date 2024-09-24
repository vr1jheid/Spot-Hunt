import { Button, CopyButton, Drawer, NumberInput, Slider } from "@mantine/core";
import { useUserStore } from "entities/user";
import { spotsAPI } from "features/parkingSpot";
import { useUserSettings } from "features/user";
import { useEffect, useRef, useState } from "react";

import { useMenu } from "../model/menuStore";

export const AppMenu = () => {
  const idInput = useRef<HTMLInputElement | null>(null);
  const { open, setOpen } = useMenu();
  const { id, setID } = useUserStore();

  const {
    settings,
    mutation: settingsMutation,
    invalidate,
  } = useUserSettings({
    mutationOptions: {
      onSuccess: () => {
        spotsAPI.invalidateSpots();
      },
      onError: () => {
        setSliderValue(settings?.minimumVotes);
      },
    },
  });
  const [sliderValue, setSliderValue] = useState(settings?.minimumVotes);

  const sliderMarks = Array(10)
    .fill(null)
    .map((_, i) => ({ value: i + 1, label: i + 1 }));

  useEffect(() => {
    setSliderValue(settings?.minimumVotes);
  }, [settings?.minimumVotes]);

  useEffect(() => {
    invalidate();
  }, [id]);

  return (
    <Drawer
      position="right"
      opened={open}
      onClose={() => setOpen(false)}
      withCloseButton={false}
      size={"100%"}
    >
      <div className="flex h-full w-full flex-col gap-7">
        <div className="flex gap-2">
          <NumberInput ref={idInput} min={0} />
          <Button
            onClick={() => {
              if (!idInput.current?.value) {
                return;
              }

              setID(window.btoa(idInput.current?.value));
            }}
          >
            set
          </Button>
        </div>
        <div className="flex items-center gap-5">
          User id
          <CopyButton value={id ?? ""}>
            {({ copied, copy }) => (
              <Button color={copied ? "teal" : "blue"} onClick={copy}>
                {id}
              </Button>
            )}
          </CopyButton>
        </div>
        <div>
          <div className="pb-3s">Spots filter by votes</div>
          <Slider
            disabled={!settings?.minimumVotes}
            defaultValue={settings?.minimumVotes}
            color="blue"
            min={1}
            max={10}
            value={sliderValue}
            onChange={(value) => setSliderValue(value)}
            marks={sliderMarks}
            onChangeEnd={(value) => {
              settingsMutation.mutate({ minimumVotes: value });
            }}
          />
        </div>
      </div>
    </Drawer>
  );
};
