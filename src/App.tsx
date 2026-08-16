import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import AppErrorBoundary from "./app/errorBoundary";
import { AppRootEvent } from "./app/rootEvent";
import AppRootProvider from "./app/rootProvider";
import GlobalLoading from "./components/loading/globalLoading";
import { GlobalStyle } from "./lib/style";
import { Router } from "./router";

/* -----------------------------------------------
 * AppRoot
 * ----------------------------------------------- */

const App = () => {
  useEffect(() => {
    AppRootEvent.initGA(); // GA4 初期化処理
  }, []);

  return (
    <AppErrorBoundary>
      <AppRootProvider>
        <BrowserRouter>
          <GlobalStyle />
          <GlobalLoading />
          <Router />
        </BrowserRouter>
      </AppRootProvider>
    </AppErrorBoundary>
  );
};

export default App;
