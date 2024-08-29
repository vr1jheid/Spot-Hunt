import { RouterProvider } from "react-router-dom";

import { router } from "../Routes/router";

export const App = () => {
  return <RouterProvider router={router} />;
};
