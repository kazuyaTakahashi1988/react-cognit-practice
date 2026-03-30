import { getCurrentUser } from "aws-amplify/auth";
import { createContext, useEffect, useMemo, useState } from "react";

import type { TypeAuthContext } from "../../lib/types";
import type React from "react";

export const AuthContext = createContext<TypeAuthContext | null>(null);

const getCurrentSignInFlag = async () => {
  try {
    await getCurrentUser();
    return true;
  } catch {
    return false;
  }
};

/* -----------------------------------
 * Auth プロバイダー
 * -------------------------------- */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  const refreshAuthState = () => {
    void getCurrentSignInFlag().then((flag) => {
      setIsSignedIn(flag);
    });
  };

  useEffect(() => {
    refreshAuthState();
  }, []);

  const value = useMemo(() => ({ isSignedIn, refreshAuthState }), [isSignedIn]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
