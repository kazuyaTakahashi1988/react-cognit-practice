import { BrowserRouter } from "react-router-dom";

import { GlobalStyle } from "./lib/style";
import { Router } from "./router";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Router />
    </BrowserRouter>
  );
};

export default App;
