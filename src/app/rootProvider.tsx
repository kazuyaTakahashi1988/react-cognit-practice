import { AuthProvider } from "../utils/authHelper/authProvider";
import { StoreProvider } from "../utils/storeHelper/storeProvider";

import type React from "react";

/* -----------------------------------------------
 * アプリ全体の Provider 構成
 * ----------------------------------------------- */
const AppRootProvider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <StoreProvider>
    <AuthProvider>{children}</AuthProvider>
  </StoreProvider>
);

export default AppRootProvider;
