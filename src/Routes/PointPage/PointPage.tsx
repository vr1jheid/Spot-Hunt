import { CloseButton } from "@mantine/core";
import photoPlug from "../../Assets/no_photo.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PointLocalData } from "../../Types/PointData";

export const PointPage = () => {
  const { data } = useQuery<PointLocalData[]>({ queryKey: ["points"] });
  const navigate = useNavigate();
  const closePage = () => navigate(-1);
  const params = useParams();
  const id = params.id;
  if (!id || !data) return;
  const pointData = data?.find((p) => p.id == +id);

  console.log(params);

  return (
    <div className="absolute bottom-0 h-[630px] w-full bg-white z-10">
      <div className="w-full h-52">
        <div className=" absolute top-1 right-1">
          <CloseButton onClick={closePage} size="lg" />
        </div>
        <img
          className="w-full h-full object-fill"
          src={photoPlug}
          alt="spot photo"
        />
      </div>
    </div>
  );
};
