import { IconListDetails } from "@tabler/icons-react";
import { MapControlButton } from "shared/ui/MapControlButton/MapControlButton";

import { useSpotsSheet } from "../model/spotsSheetStore";

export const SpotsSheetControlButton = () => {
  const { setOpen } = useSpotsSheet();
  return (
    <div className="absolute left-1 top-1/2 z-[1]">
      <MapControlButton onClick={() => setOpen(true)}>
        <IconListDetails size={25} />
      </MapControlButton>
    </div>
  );
};
