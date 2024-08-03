import { MapBox } from "./Components/MapBox/MapBox";
import { MapBoxContextProvider } from "./Components/MapBox/Context/MapBoxContextProvider";

function App() {
  return (
    <MapBoxContextProvider>
      <MapBox />
    </MapBoxContextProvider>
  );
}

export default App;
