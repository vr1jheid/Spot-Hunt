import { useParams } from "react-router-dom";

import { NewPointForm } from "../../Components/NewPointForm/NewPointForm";
import { OverlayContainer } from "../../Components/OverlayContainer/OverlayContainer";

export const NewPointPage = () => {
  const { coords } = useParams() as { coords: string };
  return (
    <OverlayContainer>
      <div className="p-3 w-full h-full flex justify-center items-center ">
        <NewPointForm coords={coords.split(",")} />
      </div>
    </OverlayContainer>
  );
};
