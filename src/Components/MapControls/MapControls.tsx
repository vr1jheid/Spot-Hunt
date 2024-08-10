import { IconPlus, IconMinus, IconNavigationFilled } from "@tabler/icons-react";
import { MapControlButton } from "./MapControlButton";
import { useContext } from "react";
import { MapBoxContext } from "../MapBox/Context/MapBoxContext";
import { useUserStore } from "../../Routes/MapPage/userStore";

export const MapControls = () => {
  const { map } = useContext(MapBoxContext);
  const { setLocation } = useUserStore();

  if (!map) return;

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { longitude: lng, latitude: lat } = coords;

      setLocation({ lng, lat });
      map.easeTo({ center: { lng, lat }, zoom: 15 });
    });
  };

  return (
    <div className="absolute right-1 w-12 bottom-1/2 translate-y-1/2 flex flex-col gap-10">
      <MapControlButton onClick={getLocation}>
        <IconNavigationFilled size={33} />
      </MapControlButton>
      <div className="flex flex-col gap-3">
        <MapControlButton
          onClick={() => {
            map.zoomIn();
          }}
        >
          <IconPlus size={33} />
        </MapControlButton>
        <MapControlButton
          onClick={() => {
            map.zoomOut();
          }}
        >
          <IconMinus size={33} />
        </MapControlButton>
      </div>
    </div>
  );
};
