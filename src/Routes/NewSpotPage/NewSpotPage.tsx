import { MouseEvent, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { NewSpotForm } from "../../Components/NewSpotForm/NewSpotForm";
import { OverlayContainer } from "../../Components/OverlayContainer/OverlayContainer";

export const NewSpotPage = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const { coords } = useParams() as { coords: string };
  const navigate = useNavigate();

  const closeOnClickOutside = ({
    target,
  }: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    if (form.current?.contains(target as Node)) {
      return;
    }
    navigate("/");
  };

  return (
    <OverlayContainer>
      <div
        className="flex h-full w-full items-center justify-center p-3"
        onClick={closeOnClickOutside}
      >
        <NewSpotForm ref={form} coords={coords.split(",")} />
      </div>
    </OverlayContainer>
  );
};
