import { IconMapPin } from "@tabler/icons-react";

import { convertDistanceToText } from "../../../shared/lib/convertDistanceToText";
import { SpotLocalData } from "../../../shared/model/spotTypes";

interface SpotDataWithDistance extends SpotLocalData {
  distance?: number;
}

interface Props {
  spotData: SpotDataWithDistance;
  onClick?: (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const SpotPreview = ({ spotData, onClick }: Props) => {
  const { title, rate, distance } = spotData;
  return (
    <div onClick={onClick} className="flex h-[60px] w-full items-center px-2">
      <div className="h-3/4 rounded-md bg-slate-100 p-2">
        <IconMapPin stroke={1} size={25} />
      </div>
      <div className="inline-flex grow flex-col px-4">
        <span className="text-md font-medium">
          {title}
          {rate && ` (${rate}$/h)`}
        </span>
      </div>
      {distance && convertDistanceToText(distance)}
    </div>
  );
};
