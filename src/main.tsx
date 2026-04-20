import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { initGA } from "./utils/ga4Helper";
import { AuthProvider } from "./utils/providerHelper/authProvider";
import { StoreProvider } from "./utils/providerHelper/storeProvider";

/* -----------------------------------------------
 * アプリメインファイル（Providerなどを纒める箇所）
 * ----------------------------------------------- */

initGA(); // GA4 初期化処理

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container not found");
}

createRoot(container).render(
  <React.StrictMode>
    <StoreProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StoreProvider>
  </React.StrictMode>,
);
