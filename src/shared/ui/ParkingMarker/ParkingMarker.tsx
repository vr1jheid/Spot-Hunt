import { IconParkingCircleFilled } from "@tabler/icons-react";

export const ParkingMarker = ({ color }: { color: string }) => {
  return (
    <div className=" absolute top-0 left-0 z-40 inline-flex justify-center items-center">
      <div className="bg-white absolute w-4 h-4 z-[1] rounded-full"></div>
      <IconParkingCircleFilled color={color} size={30} style={{ zIndex: 2 }} />
    </div>
  );
};
