import {
  IconListDetails,
  IconMinus,
  IconNavigationFilled,
  IconPlus,
} from "@tabler/icons-react";
import { useContext } from "react";

import { useSpotsSheet } from "../../Store/SpotsSheetStore";
import { useUserStore } from "../../Store/userStore";
import { MapBoxContext } from "../MapBox/Context/MapBoxContext";
import { MapControlButton } from "./MapControlButton";

export const MapControls = () => {
  const { map } = useContext(MapBoxContext);
  const { setLocation } = useUserStore();
  const { setOpen } = useSpotsSheet();

  if (!map) return;

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { longitude: lng, latitude: lat } = coords;

      setLocation({ lng, lat });
      map.easeTo({ center: { lng, lat }, zoom: 15 });
    });
  };

  return (
    <>
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

        <MapControlButton onClick={() => setOpen(true)}>
          <IconListDetails size={25} />
        </MapControlButton>
      </div>
    </>
  );
};
