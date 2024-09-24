import { router } from "app/model/router";
import { useUserStore } from "entities/user";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

export const App = () => {
  const { setID } = useUserStore();
  useEffect(() => {
    setID(
      window.btoa(`${window.Telegram.WebApp.initDataUnsafe.user?.id ?? 3457}`),
    );
  }, []);

  return <RouterProvider router={router} />;
};
