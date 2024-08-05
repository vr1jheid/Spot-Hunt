import { createBrowserRouter } from "react-router-dom";
import App from "../Components/App/App";
import { NewPointForm } from "../Components/NewPointForm/NewPointForm";

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
