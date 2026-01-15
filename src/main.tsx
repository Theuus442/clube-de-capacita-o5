import { createRoot } from "react-dom/client";
import TagManager from "react-gtm-module";
import App from "./App.tsx";
import "./index.css";

// Initialize Google Tag Manager
const tagManagerArgs = {
  gtmId: "GTM-WCLWV7PV",
};

TagManager.initialize(tagManagerArgs);

createRoot(document.getElementById("root")!).render(<App />);
