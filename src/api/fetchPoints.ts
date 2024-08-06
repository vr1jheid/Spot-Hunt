import { QueryFunctionContext } from "@tanstack/react-query";
import { PointServerData } from "../Types/PointData";
import { API_URL } from "./Constants/constants";

export const fetchPoints = async ({
  params,
}: {
  params: { [key in string]: string };
}) => {
  /*   const { params } = props.meta as { params: { [key in string]: string } };
  console.log(params); */

  const url = new URL(`${API_URL}/api/park-point/`);
  params &&
    Object.entries(params).forEach(([name, value]) => {
      url.searchParams.set(name, value);
    });

  const response = await fetch(url, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
  if (!response.ok) {
    console.log(await response.text());
    throw new Error("Api response error");
  }
  const data = await response.json();
  console.log(data.data.items);

  return data.data.items as PointServerData[];
};
