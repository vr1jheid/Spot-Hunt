import { Button } from "@mantine/core";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BottomSheet } from "react-spring-bottom-sheet";

import { MapBoxContext } from "../../Components/MapBox/Context/MapBoxContext";

export const PointOptions = () => {
  const { tempPointMarker } = useContext(MapBoxContext);
  const navigate = useNavigate();
  const { coords } = useParams() as { coords: string };
  return (
    <BottomSheet
      open
      onDismiss={() => {
        navigate("/");
        console.log(tempPointMarker);
      }}
    >
      <ul className=" p-2">
        <li className="w-full">
          <Button
            fullWidth
            onClick={() => {
              navigate(`/new-spot/${coords}`);
            }}
            classNames={{ label: "w-full flex justify-between" }}
          >
            <span className=" grow">Add new spot</span>
          </Button>
        </li>
      </ul>
    </BottomSheet>
  );
};
