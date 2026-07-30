import { getCurrentUser } from "aws-amplify/auth";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { TypeAuthContext, TypeAuthStatus } from "../../lib/types";
import type React from "react";

/* -----------------------------------------------
 * Auth プロバイダー
 * ----------------------------------------------- */

export const AuthContext = createContext<TypeAuthContext | null>(null);

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
  const [authStatus, setAuthStatus] = useState<TypeAuthStatus>("loading");

  const refreshAuthState = useCallback(async () => {
    const isSignedIn = await getCurrentSignInFlag();
    setAuthStatus(isSignedIn ? "authenticated" : "unauthenticated");
  }, []);

  useEffect(() => {
    void refreshAuthState();
  }, [refreshAuthState]);

  const value = useMemo(
    () => ({
      authStatus,
      isSignedIn: authStatus === "authenticated",
      refreshAuthState,
    }),
    [authStatus, refreshAuthState],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
