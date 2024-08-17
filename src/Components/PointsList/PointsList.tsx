import { useQuery } from "@tanstack/react-query";
import { PointLocalData } from "../../Types/PointTypes";
import { PointPreview } from "../PointPreview/PointPreview";
import clsx from "clsx";
import { useDraggableList } from "./Hooks/useDraggableList";
import { useNavigate } from "react-router-dom";

const touchAreaHeight = 28;
const maxVisibleItems = 10;
const itemSize = 60;

export const PointsList = () => {
  const { data } = useQuery<PointLocalData[]>({ queryKey: ["points"] });
  /*   const data = mockPoints; */
  const navigate = useNavigate();

  const { visibleHeight, height, onTouchStart, isFullOpen } = useDraggableList({
    touchAreaHeight,
    maxVisibleItems,
    itemSize,
    itemsCount: data?.length ?? 0,
  });

  const { value: visibleHeightValue } = visibleHeight;

  return (
    <div
      style={{
        transform: `translateY(${height - visibleHeightValue}px)`,
        maxHeight: height,
      }}
      className={clsx(
        "bg-white w-full px-1 absolute bottom-0 z-10 flex flex-col"
      )}
    >
      <button
        className="w-full h-fit py-1 bg-slate-100"
        onTouchStart={onTouchStart}
      >
        <div className="h-2 mb-2 mt-1 w-16 mx-auto bg-slate-400 rounded-full"></div>
      </button>
      <ul className={clsx(isFullOpen && "overflow-y-scroll")}>
        {data &&
          data?.map((p) => (
            <li key={p.id} className="block">
              <PointPreview
                onClick={() => {
                  navigate(`point/${p.id}`);
                }}
                pointData={p}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};
