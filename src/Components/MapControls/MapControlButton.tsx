import { ComponentProps, ReactNode } from "react";

interface Props extends ComponentProps<"button"> {
  children: ReactNode;
}

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
