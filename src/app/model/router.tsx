import { MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MapPage } from "pages/MapPage";
import { NewSpotPage } from "pages/NewSpotPage";
import { PointOptionsPage } from "pages/PointOptionsPage/ui/PointOptionsPage";
import { SpotPage } from "pages/SpotPage";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { queryClient } from "shared/lib/queryClient";

import { ErrorBoundary } from "../ui/ErrorBoundary/ErrorBoundary.tsx";

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
    errorElement: <ErrorBoundary />,
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
            element: <PointOptionsPage />,
          },
        ],
      },
    ],
  },
]);
