import { PointLocalData } from "../../Types/PointData";
import { IconCar } from "@tabler/icons-react";

interface Props {
  pointData: PointLocalData;
  onClick?: (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const PointPreview = ({ pointData, onClick }: Props) => {
  const { title, rate } = pointData;
  return (
    <div onClick={onClick} className="w-full h-[60px] flex items-center">
      <div className=" h-3/4 p-2 bg-slate-100 rounded-md">
        <IconCar stroke={1} size={"full"} />
      </div>
      <div className=" inline-flex flex-col px-4 grow">
        <span className=" text-md  font-medium">{title}</span>
        <span className=" text-sm">Adress</span>
      </div>
      {rate && <div>{rate}$/h</div>}
    </div>
  );
};
