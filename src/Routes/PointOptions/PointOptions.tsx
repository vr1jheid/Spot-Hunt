import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { BottomSheet } from "react-spring-bottom-sheet";

export const PointOptions = () => {
  const navigate = useNavigate();
  const { coords } = useParams() as { coords: string };
  return (
    <BottomSheet open onDismiss={() => navigate("/")}>
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
            <span className=" bg-white rounded-md mx-3">
              <IconPlus color="#228be6" />
            </span>
          </Button>
        </li>
      </ul>
    </BottomSheet>
  );
};
