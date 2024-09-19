import { Button, CopyButton, Drawer, Slider } from "@mantine/core";
import { useUserSettings } from "entities/user/lib/hooks/useUserSettings";
import { useState } from "react";

import { useMenu } from "../../shared/Store/menuStore";
import { useUserStore } from "../../shared/Store/userStore";

export const AppMenu = () => {
  const { open, setOpen } = useMenu();
  const { id } = useUserStore();
  const { settings, mutation: settingsMutation } = useUserSettings({
    mutationOptions: {
      onError: () => {
        setSliderValue(settings?.minimumVotes);
      },
    },
  });
  const [sliderValue, setSliderValue] = useState(settings?.minimumVotes);

  const sliderMarks = [0, 2, 4, 6, 8, 10].map((n) => ({ value: n, label: n }));

  return (
    <Drawer
      position="right"
      opened={open}
      onClose={() => setOpen(false)}
      withCloseButton={false}
      size={"100%"}
    >
      <div className="flex h-full w-full flex-col gap-7">
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
        <Slider
          disabled={!settings}
          defaultValue={settings?.minimumVotes}
          color="blue"
          min={0}
          max={10}
          value={sliderValue}
          onChange={(value) => setSliderValue(value)}
          marks={sliderMarks}
          onChangeEnd={(value) => {
            settingsMutation.mutate({ minimumVotes: value });
          }}
        />
      </div>
    </Drawer>
  );
};