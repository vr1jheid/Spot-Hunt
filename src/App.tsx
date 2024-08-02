import { useState } from "react";
import { MapBox } from "./Components/MapBox";

function App() {
  const [token, setToken] = useState("");
  const [input, setInput] = useState("");

  return (
    <>
      <div>
        {" "}
        <input
          className=" bg-black text-white"
          type="text"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button
          onClick={() => {
            setToken(input);
          }}
          className=" bg-black text-white ml-4"
        >
          ok
        </button>
      </div>

      {token && <MapBox token={token} />}
    </>
  );
}

export default App;
