import { ComponentProps, ReactNode } from "react";

interface Props extends ComponentProps<"div"> {
  children?: ReactNode;
}

export const OverlayContainer = ({ children, ...other }: Props) => {
  return (
    <div {...other} className="absolute w-full h-full top-0 left-0 z-10">
      {children}
    </div>
  );
};
