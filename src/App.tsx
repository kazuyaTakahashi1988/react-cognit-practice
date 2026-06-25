import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { GlobalStyle } from "./lib/style";
import { Router } from "./router";
import AppRootProvider from "./utils/appRootHelper/appRootProvider";
import { initGA } from "./utils/ga4Helper";

/* -----------------------------------------------
 * AppRoot
 * ----------------------------------------------- */

const App = () => {
  const container = document.getElementById("root");

  if (!container) {
    throw new Error("Root container not found");
  }

  initGA(); // GA4 初期化処理

  return createRoot(container).render(
    <React.StrictMode>
      <AppRootProvider>
        <BrowserRouter>
          <GlobalStyle />
          <Router />
        </BrowserRouter>
      </AppRootProvider>
    </React.StrictMode>,
  );
};

App();
