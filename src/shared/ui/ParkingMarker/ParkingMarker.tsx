import { IconParkingCircleFilled } from "@tabler/icons-react";
import clsx from "clsx";
import { MapTypes } from "entities/map";

interface ParkingMarkerProps {
  type?: MapTypes.MarkerType;
}

const getMarkerColor = (type: ParkingMarkerProps["type"]) => {
  switch (type) {
    case "standart":
      return "blue";
    case "selected":
      return "black";
    case "approved":
      return "blue";
    default:
      return "blue";
  }
};

export const ParkingMarker = ({ type }: ParkingMarkerProps) => {
  const color = getMarkerColor(type);
  return (
    <div
      className={clsx(
        "absolute left-0 top-0 z-40 inline-flex h-fit w-fit items-center justify-center rounded-full",
        type === "approved" && "border-[3px] border-green-700",
        type === "selected" && "border-[3px] border-yellow-400",
      )}
    >
      <div className="absolute h-full w-full rounded-full bg-white"></div>
      <div
        className="absolute z-[1] h-4 w-4 rounded-full bg-white"
        style={{ backgroundColor: color }}
      ></div>
      <IconParkingCircleFilled
        color="white"
        size={25}
        style={{ zIndex: 2, maxWidth: "fit-content", maxHeight: "fit-content" }}
      />
    </div>
  );
};
