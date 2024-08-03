import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { NewPointForm } from "./NewPointForm/NewPointForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/new-point/:coords",
        element: <NewPointForm />,
      },
    ],
  },
]);
