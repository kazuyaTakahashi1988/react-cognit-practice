import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { getEnvironment } from "./config/environment";

/* -----------------------------------------------
 * main ファイル
 * ----------------------------------------------- */

const container = document.getElementById("root");

// 必須設定を起動時に検証し、設定不備を早期に発見する。
getEnvironment();

if (!container) {
  throw new Error("Root container not found");
}

createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
