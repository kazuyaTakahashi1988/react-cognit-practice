import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import AppErrorBoundary from "./components/error/appErrorBoundary";
import GlobalLoading from "./components/loading/globalLoading";
import { GlobalStyle } from "./lib/style";
import { Router } from "./router";
import { AppRootEvent } from "./utils/appRootHelper/appRootEvent";
import AppRootProvider from "./utils/appRootHelper/appRootProvider";

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
