import { IconMoodEmpty } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { BottomSheet } from "react-spring-bottom-sheet";

import { PointLocalData } from "../../Types/PointTypes";
import { PointPreview } from "../PointPreview/PointPreview";
import { usePointsSheet } from "./SheetStore";

export const PointsSheet = () => {
  const { data } = useQuery<PointLocalData[]>({ queryKey: ["points"] });
  const navigate = useNavigate();

  const { open, setOpen } = usePointsSheet();

  const onDismiss = () => setOpen(false);

  return (
    <BottomSheet
      open={open}
      onDismiss={onDismiss}
      snapPoints={({ maxHeight }) => maxHeight * 0.8}
      header={<div className="h-6 bg-white rounded-t-lg"></div>}
      expandOnContentDrag
    >
      {!data?.length && (
        <div className="w-full h-full flex flex-col items-center gap-10 py-16 text-4xl font-semibold">
          <IconMoodEmpty size={80} />
          No points nearby
        </div>
      )}
      {data?.map((p) => (
        <PointPreview
          key={p.id}
          onClick={() => {
            navigate(`point/${p.id}`);
            setOpen(false);
          }}
          pointData={p}
        />
      ))}
    </BottomSheet>
  );
};
