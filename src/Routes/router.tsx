import { MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, Outlet } from "react-router-dom";

import { queryClient } from "../Tanstack/queryClient";
import { MapPage } from "./MapPage/MapPage";
import { NewSpotPage } from "./NewSpotPage/NewSpotPage";
import { PointOptions } from "./PointOptions/PointOptions";
import { SpotPage } from "./SpotPage/SpotPage";

export const router = createBrowserRouter([
  {
    element: (
      <>
        <QueryClientProvider client={queryClient}>
          <MantineProvider>
            <Outlet />
          </MantineProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </>
    ),
    children: [
      {
        path: "/",
        element: <MapPage />,
        children: [
          {
            path: "/new-spot/:coords",
            element: <NewSpotPage />,
          },
          {
            path: "/spot/:id",
            element: <SpotPage />,
          },
          {
            path: "/options/:coords",
            element: <PointOptions />,
          },
        ],
      },
    ],
  },
]);
