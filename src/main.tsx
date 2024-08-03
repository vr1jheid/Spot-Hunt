import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import mapboxgl from "mapbox-gl";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/router.tsx";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
);
