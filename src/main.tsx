import ReactDOM from "react-dom/client";
import "./index.css";
import mapboxgl from "mapbox-gl";
import "@mantine/core/styles.css";
import { App } from "./Components/App/App";
import "@mantine/carousel/styles.css";
import { API_URL } from "./api/Constants/constants";

/* mapboxgl.accessToken =  */
const overflow = 100;
document.body.style.overflowY = "hidden";
document.body.style.marginTop = `${overflow}px`;
document.body.style.height = window.innerHeight + overflow + "px";
document.body.style.paddingBottom = `${overflow + 20}px`;
window.scrollTo(0, overflow);

fetch(`${API_URL}/api/config/all`).then((r) =>
  r.json().then((r) => {
    mapboxgl.accessToken = r.data.mapbox;
    ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
  })
);
