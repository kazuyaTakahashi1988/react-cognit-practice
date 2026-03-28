import { createContext, useMemo, useState } from "react";

import { userPool } from ".";

import type { TypeAuthContext } from "../../lib/types";
import type React from "react";

export const AuthContext = createContext<TypeAuthContext | null>(null);

const getCurrentSignInFlag = () => !!userPool.getCurrentUser();

/* -----------------------------------
 * Auth プロバイダー
 * -------------------------------- */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(getCurrentSignInFlag());

  const refreshAuthState = () => {
    setIsSignedIn(getCurrentSignInFlag());
  };

  const value = useMemo(() => ({ isSignedIn, refreshAuthState }), [isSignedIn]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
