import { createBrowserRouter } from "react-router-dom";
import { NewPointForm } from "../Components/NewPointForm/NewPointForm";
import App from "../Components/App/App";

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
