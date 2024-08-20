import "./Styles/index.css";
import "./Styles/BotomSheet.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";

import mapboxgl from "mapbox-gl";
import ReactDOM from "react-dom/client";

import { API_URL } from "./api/Constants/constants";
import { App } from "./Components/App/App";

fetch(`${API_URL}/api/config/all`).then((r) =>
  r.json().then((r) => {
    mapboxgl.accessToken = r.data.mapbox;
    ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
  })
);

/* ReactDOM.createRoot(document.getElementById("root")!).render(<App />); */
