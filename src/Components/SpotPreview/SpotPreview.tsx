import { IconMapPin } from "@tabler/icons-react";

import { SpotLocalData } from "../../Types/PointTypes";
import { convertDistanceToText } from "../../Utils/convertDistanceToText";

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
    <div onClick={onClick} className="w-full h-[60px] px-2 flex items-center">
      <div className=" h-3/4 p-2 bg-slate-100 rounded-md">
        <IconMapPin stroke={1} size={25} />
      </div>
      <div className=" inline-flex flex-col px-4 grow">
        <span className=" text-md  font-medium">
          {title}
          {rate && ` (${rate}$/h)`}
        </span>
        <span className=" text-sm">Adress</span>
      </div>
      {distance && convertDistanceToText(distance)}
    </div>
  );
};
