import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

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
    <AppRootProvider>
      <BrowserRouter>
        <GlobalStyle />
        <GlobalLoading />
        <Router />
      </BrowserRouter>
    </AppRootProvider>
  );
};

export default App;
