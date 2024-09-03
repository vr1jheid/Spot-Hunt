import { Button, CopyButton, Drawer, Slider } from "@mantine/core";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { fetchUserSettings } from "../../api/GET/fetchUserSettings";
import { updateUserSettings } from "../../api/POST/updateUserSettings";
import { useMenu } from "../../Store/menuStore";
import { useUserStore } from "../../Store/userStore";

export const Menu = () => {
  const { open, setOpen } = useMenu();
  const { id } = useUserStore();
  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: fetchUserSettings,
  });
  const [sliderValue, setSliderValue] = useState(settings?.minimumVotes);

  const settingsMutation = useMutation({
    mutationFn: updateUserSettings,
    onError: () => {
      setSliderValue(settings?.minimumVotes);
    },
  });

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
