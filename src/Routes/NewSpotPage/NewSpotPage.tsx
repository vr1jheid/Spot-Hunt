import { MouseEvent, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { NewPointForm } from "../../Components/NewPointForm/NewPointForm";
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
        className="p-3 w-full h-full flex justify-center items-center "
        onClick={closeOnClickOutside}
      >
        <NewPointForm ref={form} coords={coords.split(",")} />
      </div>
    </OverlayContainer>
  );
};
