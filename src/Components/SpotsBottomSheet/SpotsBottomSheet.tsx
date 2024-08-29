import { IconMoodEmpty } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { BottomSheet } from "react-spring-bottom-sheet";

import { useSpotsSheet } from "../../Store/SpotsSheetStore";
import { useUserStore } from "../../Store/userStore";
import { SpotLocalData } from "../../Types/PointTypes";
import { getDistanceBetweenPoints } from "../../Utils/getDistanceBetweenPoints";
import { SpotPreview } from "../SpotPreview/SpotPreview";

export const SpotsBottomSheet = () => {
  const { data } = useQuery<SpotLocalData[]>({ queryKey: ["spots"] });
  const navigate = useNavigate();
  const { location } = useUserStore();

  const { open, setOpen } = useSpotsSheet();

  const onDismiss = () => setOpen(false);

  const sortedData = useMemo(
    () =>
      location
        ? data
            ?.map((p) => {
              return {
                ...p,
                distance: getDistanceBetweenPoints(location, p.coordinates),
              };
            })
            .sort((a, b) => a.distance - b.distance)
        : data,
    [data, location]
  );

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
      {sortedData?.map((p) => (
        <SpotPreview
          key={p.id}
          onClick={() => {
            navigate(`spot/${p.id}`);
            setOpen(false);
          }}
          spotData={p}
        />
      ))}
    </BottomSheet>
  );
};
