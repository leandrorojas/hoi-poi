import "./theme/index.css";
import "./theme/overrides.css";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found. Ensure an element with id 'root' exists in your HTML.");
}

const root = createRoot(container);
root.render(<App />);
