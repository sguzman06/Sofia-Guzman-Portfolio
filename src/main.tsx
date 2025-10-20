import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { LangProvider } from "./hooks/useLang";
import { ThemeProvider } from "./hooks/useTheme";
import './index.css';



createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <LangProvider>
        <App />
      </LangProvider>
    </ThemeProvider>
  </React.StrictMode>
);
