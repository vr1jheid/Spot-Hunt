import { ComponentProps, ReactNode } from "react";

interface Props extends ComponentProps<"div"> {
  children?: ReactNode;
}

export const OverlayContainer = ({ children, ...other }: Props) => {
  return (
    <div {...other} className="absolute left-0 top-0 z-10 h-full w-full">
      {children}
    </div>
  );
};
