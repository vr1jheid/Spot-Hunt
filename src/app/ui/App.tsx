import { router } from "app/model/router";
import { RouterProvider } from "react-router-dom";

export const App = () => {
  return <RouterProvider router={router} />;
};
