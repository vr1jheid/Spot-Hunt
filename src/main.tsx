import ReactDOM from "react-dom/client";
import "./index.css";
import mapboxgl from "mapbox-gl";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/router.tsx";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
    <ReactQueryDevtools />
  </QueryClientProvider>
);
