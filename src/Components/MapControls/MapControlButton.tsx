import { ComponentProps } from "react";

interface Props extends ComponentProps<"button"> {}

export const MapControlButton = ({ children, ...buttonProps }: Props) => {
  return (
    <button
      className="p-2 bg-white rounded-xl opacity-40 active:opacity-100"
      {...buttonProps}
    >
      {children}
    </button>
  );
};
