import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { loadingFlugStore } from './lib/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={loadingFlugStore}>
      <App />
    </Provider>
  </React.StrictMode>,
);
