import { clsx } from "clsx";
import { ComponentProps } from "react";

interface Props extends ComponentProps<"button"> {
  active?: boolean;
}

export const MapControlButton = ({
  children,
  active,
  ...buttonProps
}: Props) => {
  return (
    <button
      className={clsx(
        "p-2 bg-white rounded-xl active:opacity-100",
        !active && " opacity-40",
        active && "opacity-100"
      )}
      {...buttonProps}
    >
      {children}
    </button>
  );
};
