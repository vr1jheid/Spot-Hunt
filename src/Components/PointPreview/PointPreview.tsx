import { IconMapPin } from "@tabler/icons-react";

import { PointLocalData } from "../../Types/PointTypes";
import { convertDistanceToText } from "../../Utils/convertDistanceToText";

interface PointDataWithDistance extends PointLocalData {
  distance?: number;
}

interface Props {
  pointData: PointDataWithDistance;
  onClick?: (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const PointPreview = ({ pointData, onClick }: Props) => {
  const { title, rate } = pointData;
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
      {pointData?.distance && convertDistanceToText(pointData.distance)}
    </div>
  );
};
