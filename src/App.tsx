import { BrowserRouter } from "react-router-dom";

import { GlobalStyle } from "./lib/style";
import { Router } from "./router";

/* -----------------------------------------------
 * アプリルートファイル
 * ----------------------------------------------- */

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Router />
    </BrowserRouter>
  );
};

export default App;
