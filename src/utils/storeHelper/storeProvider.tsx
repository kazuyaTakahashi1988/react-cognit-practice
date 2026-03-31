import { Provider } from "react-redux";

import { store } from ".";

import type React from "react";

/* -----------------------------------
 * Store プロバイダー
 * -------------------------------- */
export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
