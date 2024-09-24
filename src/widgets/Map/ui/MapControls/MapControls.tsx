import { IconMinus, IconNavigationFilled, IconPlus } from "@tabler/icons-react";
import { useMap } from "entities/map";
import { useUserStore } from "entities/user";

import { MapControlButton } from "../../../../shared/ui/MapControlButton/MapControlButton";

export const MapControls = () => {
  const { mapRef } = useMap();
  const { setLocation } = useUserStore();

  if (!mapRef.current) return;

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { longitude: lng, latitude: lat } = coords;

      setLocation({ lng, lat });
      mapRef.current?.easeTo({ center: { lng, lat }, zoom: 15 });
    });
  };

  return (
    <div className="absolute bottom-1/2 right-1 z-[1] flex w-12 translate-y-1/2 flex-col gap-10">
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
    </div>
  );
};
