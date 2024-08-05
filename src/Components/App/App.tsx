import { Outlet } from "react-router-dom";
import { fetchAllPoints } from "../../api/fetchAllPoints";
import { MapBoxContextProvider } from "../MapBox/Context/MapBoxContextProvider";
import { MapBox } from "../MapBox/MapBox";

function App() {
  const testFunc = async () => {
    const points = await fetchAllPoints();
    console.log(points);
  };

  return (
    <>
      <MapBoxContextProvider>
        <MapBox />
        <Outlet />
      </MapBoxContextProvider>
      <button
        onClick={testFunc}
        className="absolute w-10 h-10 top-0 left-0 bg-white"
      >
        TEST
      </button>
    </>
  );
}

export default App;
