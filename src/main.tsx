import "app/ui//styles/index.css";
import "app/ui/styles/bottomSheet.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";

import { App } from "app/ui/App";
import { useUserStore } from "entities/user";
import ReactDOM from "react-dom/client";

useUserStore
  .getState()
  .setID(
    window.btoa(`${window.Telegram.WebApp.initDataUnsafe.user?.id ?? 3459}`),
  );

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
