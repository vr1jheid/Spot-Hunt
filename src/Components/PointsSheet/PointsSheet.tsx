import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BottomSheet } from "react-spring-bottom-sheet";
import {
  defaultSnapProps,
  SnapPointProps,
} from "react-spring-bottom-sheet/dist/types";

import { PointLocalData } from "../../Types/PointTypes";
import { PointPreview } from "../PointPreview/PointPreview";
import { usePointsSheet } from "./SheetStore";

export const PointsSheet = () => {
  const { data } = useQuery<PointLocalData[]>({ queryKey: ["points"] });
  const navigate = useNavigate();

  const { open, setOpen } = usePointsSheet();

  const onDismiss = () => setOpen(false);

  useEffect(() => {
    if (!data?.length) {
      setOpen(false);
    }
  }, [data, setOpen]);

  const getSnapPoints = ({ minHeight }: SnapPointProps) =>
    minHeight < 200 ? minHeight : [200, minHeight];

  const getDefaultSnap = ({ lastSnap, minHeight }: defaultSnapProps) =>
    lastSnap ?? (minHeight < 200 ? minHeight : 200);

  return (
    <BottomSheet
      open={open}
      onDismiss={onDismiss}
      snapPoints={getSnapPoints}
      defaultSnap={getDefaultSnap}
      blocking={false}
      expandOnContentDrag
    >
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
