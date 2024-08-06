import { OverlayContainer } from "../Components/OverlayContainer/OverlayContainer";
import { NewPointForm } from "../Components/NewPointForm/NewPointForm";

export const NewPointPage = () => {
  return (
    <OverlayContainer>
      <div className="p-3 w-full h-full flex justify-center items-center ">
        <NewPointForm />
      </div>
    </OverlayContainer>
  );
};
