import { useQuery } from "@tanstack/react-query";
import { PointLocalData } from "../../Types/PointData";
import { PointPreview } from "../PointPreview/PointPreview";
import { useContext, useState } from "react";
import { MapBoxContext } from "../MapBox/Context/MapBoxContext";

export const PointsList = () => {
  const [open, setOpen] = useState(true);
  const { data } = useQuery<PointLocalData[]>({ queryKey: ["points"] });
  const { map } = useContext(MapBoxContext);

  return (
    <div className="bg-white w-full p-1 max-h-1/4 absolute bottom-0 z-10 flex flex-col">
      <div className="w-full h-fit">
        <div className="h-1 mb-2 mt-1 w-8 mx-auto bg-slate-400 rounded-full"></div>
      </div>
      {open &&
        data?.slice(0, 3).map((p) => (
          <PointPreview
            onClick={() => {
              map?.flyTo({ center: p.coordinates });
            }}
            pointData={p}
            key={p.id}
          />
        ))}
    </div>
  );
};
