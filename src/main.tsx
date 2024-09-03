import "./Styles/index.css";
import "./Styles/BotomSheet.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";

import ReactDOM from "react-dom/client";

import { App } from "./App/App";
import { useUserStore } from "./Store/userStore";

useUserStore
  .getState()
  .setID(
    window.btoa(`${window.Telegram.WebApp.initDataUnsafe.user?.id ?? 3451}`)
  );

/* window.Telegram */
ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
