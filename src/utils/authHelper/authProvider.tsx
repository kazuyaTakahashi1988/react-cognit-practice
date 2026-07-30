import { getCurrentUser } from "aws-amplify/auth";
import { createContext, useEffect, useMemo, useState } from "react";

import type { AuthContextValue } from "./types";
import type React from "react";

/* -----------------------------------------------
 * Auth プロバイダー
 * ----------------------------------------------- */

export const AuthContext = createContext<AuthContextValue | null>(null);

const getCurrentSignInFlag = async () => {
  try {
    await getCurrentUser();
    return true;
  } catch {
    return false;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(true);

  const refreshAuthState = () => {
    setIsChecking(true);
    void getCurrentSignInFlag()
      .then(setIsSignedIn)
      .finally(() => setIsChecking(false));
  };

  useEffect(() => {
    refreshAuthState();
  }, []);

  const value = useMemo(
    () => ({ isChecking, isSignedIn, refreshAuthState }),
    [isChecking, isSignedIn],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
