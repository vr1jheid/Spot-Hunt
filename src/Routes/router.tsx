import { createBrowserRouter, Outlet } from "react-router-dom";

import { MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "../Tanstack/queryClient";
import { MapPage } from "./MapPage";
import { NewPointPage } from "./NewPointPage";

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
            element: <NewPointPage />,
          },
        ],
      },
    ],
  },
]);
