import { ActionIcon, rem, RingProgress } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

interface Props {
  value: number;
}

export const OptionsRingProgress = ({ value }: Props) => {
  console.log(value);

  if (value >= 100) {
    return (
      <ActionIcon color="teal" variant="filled" radius="xl" size="xl">
        <IconCheck style={{ width: rem(22), height: rem(22) }} />
      </ActionIcon>
    );
  } else {
    return (
      <>
        <RingProgress
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
