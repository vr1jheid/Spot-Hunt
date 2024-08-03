import { MapBox } from "./Components/MapBox/MapBox";
import { MapBoxContextProvider } from "./Components/MapBox/Context/MapBoxContextProvider";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <MapBoxContextProvider>
        <MapBox />

        <Outlet />
      </MapBoxContextProvider>
    </>
  );
}

export default App;
