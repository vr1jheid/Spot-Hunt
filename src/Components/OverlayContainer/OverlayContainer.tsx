import { ComponentProps } from "react";

interface Props extends ComponentProps<"button"> {}

export const OverlayContainer = ({ children }: Props) => {
  return (
    <div className="absolute w-full h-full top-0 left-0 z-10">{children}</div>
  );
};
