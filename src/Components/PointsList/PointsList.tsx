import { useQuery } from "@tanstack/react-query";
import { PointServerData } from "../../Types/PointData";
import { PointPreview } from "../PointPreview/PointPreview";

export const PointsList = () => {
  const { data } = useQuery<PointServerData[]>({ queryKey: ["points"] });

  return (
    <div className="bg-white w-full p-1 max-h-1/4 absolute bottom-0 z-10 flex flex-col">
      <div className="w-full h-fit">
        <div className="h-1 mb-2 mt-1 w-8 mx-auto bg-slate-400 rounded-full"></div>
      </div>
      {data?.slice(0, 3).map((p) => <PointPreview pointData={p} key={p.id} />)}
    </div>
  );
};
