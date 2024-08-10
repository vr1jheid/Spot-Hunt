import ReactDOM from "react-dom/client";
import "./index.css";
import mapboxgl from "mapbox-gl";
import "@mantine/core/styles.css";
import { App } from "./Components/App/App";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
