import {
  ActionIcon,
  rem,
  RingProgress as MantineRingProgress,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

interface Props {
  value: number;
}

export const RingProgress = ({ value }: Props) => {
  if (value >= 100) {
    return (
      <ActionIcon color="teal" variant="filled" radius="xl" size="xl">
        <IconCheck style={{ width: rem(22), height: rem(22) }} />
      </ActionIcon>
    );
  } else {
    return (
      <>
        <MantineRingProgress
          size={50}
          thickness={5}
          sections={[
            {
              value,
              color: "blue",
            },
          ]}
        />
      </>
    );
  }
};
