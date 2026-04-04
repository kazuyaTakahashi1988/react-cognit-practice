import { Provider } from "react-redux";

import { store } from "../storeHelper";

import type React from "react";

/* -----------------------------------------------
 * Store管理（Redux）プロバイダー
 * ----------------------------------------------- */

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
