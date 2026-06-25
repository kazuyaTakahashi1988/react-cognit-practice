import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { AuthProvider } from "./utils/authHelper/authProvider";
import { initGA } from "./utils/ga4Helper";
import { StoreProvider } from "./utils/storeHelper/storeProvider";

/* -----------------------------------------------
 * メインファイル（AppRoot用の処理やProviderまとめ）
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
