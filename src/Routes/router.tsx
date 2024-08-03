import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { NewPointForm } from "./NewPointForm/NewPointForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/newPoint/:coords",
        element: <NewPointForm />,
      },
    ],
  },
]);
