import { MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, Outlet } from "react-router-dom";

import { queryClient } from "../Tanstack/queryClient";
import { MapPage } from "./MapPage/MapPage";
import { NewSpotPage } from "./NewSpotPage/NewSpotPage";
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
            path: "/new-point/:coords",
            element: <NewSpotPage />,
          },
          {
            path: "/point/:id",
            element: <SpotPage />,
          },
        ],
      },
    ],
  },
]);
