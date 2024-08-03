import { ReactNode } from "react";

export const OverlayContainer = ({ children }: { children: ReactNode }) => {
  return <div className="absolute w-full h-full top-0 left-0">{children}</div>;
};
