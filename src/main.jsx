import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HeroUIProvider } from "@heroui/react";
import AuthContextComponentProvider from "./context/AuthContextComponent.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroUIProvider>
      <AuthContextComponentProvider>
      <App />
      </AuthContextComponentProvider>
    </HeroUIProvider>
  </StrictMode>
);
