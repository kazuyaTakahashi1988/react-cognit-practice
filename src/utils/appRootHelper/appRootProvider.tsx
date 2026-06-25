import { AuthProvider } from "../authHelper/authProvider";
import { StoreProvider } from "../storeHelper/storeProvider";

import type React from "react";

/* -----------------------------------------------
 * AppRoot（App.tsx）用のプロバイダーまとめ
 * ----------------------------------------------- */

const AppRootProvider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <StoreProvider>
    <AuthProvider>{children}</AuthProvider>
  </StoreProvider>
);

export default AppRootProvider;
