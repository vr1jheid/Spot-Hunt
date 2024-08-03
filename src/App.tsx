import { MapBox } from "./Components/MapBox/MapBox";
import { MapBoxContextProvider } from "./Components/MapBox/Context/MapBoxContextProvider";
import { Outlet } from "react-router-dom";
import { getAllPoints } from "./api/getAllPoints";

function App() {
  const testFunc = async () => {
    const points = await getAllPoints();
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
        className=" absolute w-10 h-10 top-0 left-0 bg-white"
      >
        TEST
      </button>
    </>
  );
}

export default App;
