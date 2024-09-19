import "app/ui/index.css";
import "app/ui/bottomSheet.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";

import { App } from "app/ui/App";
import ReactDOM from "react-dom/client";
import { useUserStore } from "shared/Store/userStore";

useUserStore
  .getState()
  .setID(
    window.btoa(`${window.Telegram.WebApp.initDataUnsafe.user?.id ?? 3457}`),
  );

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
