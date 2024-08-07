import { PointServerData } from "../../Types/PointData";
import { IconCar } from "@tabler/icons-react";

export const PointPreview = ({ pointData }: { pointData: PointServerData }) => {
  return (
    <div className="w-full h-[60px] flex items-center">
      <div className=" h-3/4 p-2 bg-slate-100 rounded-md">
        <IconCar stroke={1} height={"full"} width={"full"} />
      </div>
      <div className=" inline-flex flex-col px-4 grow">
        <span className=" text-md  font-medium">{pointData.title}</span>
        <span className=" text-sm">Adress</span>
      </div>
    </div>
  );
};
