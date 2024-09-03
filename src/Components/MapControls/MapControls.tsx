import { Burger } from "@mantine/core";
import {
  IconListDetails,
  IconMinus,
  IconNavigationFilled,
  IconPlus,
  IconZoomQuestion,
} from "@tabler/icons-react";
import { useContext } from "react";

import { useMenu } from "../../Store/menuStore";
import { useSpotsSheet } from "../../Store/spotsSheetStore";
import { useUserStore } from "../../Store/userStore";
import { MapBoxContext } from "../MapBox/Context/MapBoxContext";
import { MapControlButton } from "./MapControlButton";

export const MapControls = () => {
  const { mapRef } = useContext(MapBoxContext);
  const { setLocation, setShowUnapproved, showUnapproved } = useUserStore();
  const { setOpen } = useSpotsSheet();
  const { open: menuOpen, setOpen: setMenuOpen } = useMenu();

  if (!mapRef.current) return;

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { longitude: lng, latitude: lat } = coords;

      setLocation({ lng, lat });
      mapRef.current?.easeTo({ center: { lng, lat }, zoom: 15 });
    });
  };

  return (
    <>
      <div className="absolute bottom-1/2 left-1 w-12 translate-y-1/2">
        <MapControlButton
          active={showUnapproved}
          onClick={() => {
            setShowUnapproved(!showUnapproved);
          }}
        >
          <IconZoomQuestion size={33} />
        </MapControlButton>
      </div>
      <div className="absolute bottom-1/2 right-1 flex w-12 translate-y-1/2 flex-col gap-10">
        <MapControlButton onClick={getLocation}>
          <IconNavigationFilled size={33} />
        </MapControlButton>
        <div className="flex flex-col gap-3">
          <MapControlButton
            onClick={() => {
              mapRef.current?.zoomIn();
            }}
          >
            <IconPlus size={33} />
          </MapControlButton>
          <MapControlButton
            onClick={() => {
              mapRef.current?.zoomOut();
            }}
          >
            <IconMinus size={33} />
          </MapControlButton>
        </div>

        <MapControlButton onClick={() => setOpen(true)}>
          <IconListDetails size={25} />
        </MapControlButton>
      </div>
      <div className="absolute right-1 top-1 z-[210]">
        <Burger opened={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
      </div>
    </>
  );
};
