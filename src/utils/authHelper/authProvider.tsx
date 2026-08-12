import { getCurrentUser } from "aws-amplify/auth";
import { createContext, useEffect, useMemo, useRef, useState } from "react";

import type {
  AuthContextValue,
  AuthInitializationError,
  AuthState,
} from "../../lib/types";
import type React from "react";

/* -----------------------------------------------
 * Auth プロバイダー
 * ----------------------------------------------- */

export const AuthContext = createContext<AuthContextValue | null>(null);

const getErrorProperty = (error: unknown, property: "message" | "name") => {
  if (!(error instanceof Error)) return "UnknownAuthError";
  return error[property];
};

const isAnonymousError = (error: unknown) => {
  const name = getErrorProperty(error, "name");
  const message = getErrorProperty(error, "message");
  return [name, message].some((value) =>
    /NotAuthorized|Unauthenticated|UserUnAuthenticated/i.test(value),
  );
};

const toInitializationError = (error: unknown): AuthInitializationError => ({
  message: getErrorProperty(error, "message"),
  name: getErrorProperty(error, "name"),
});

const getCurrentAuthState = async (): Promise<AuthState> => {
  try {
    await getCurrentUser();
    return { status: "authenticated" };
  } catch (error) {
    if (isAnonymousError(error)) return { status: "anonymous" };
    return { error: toInitializationError(error), status: "error" };
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>({ status: "checking" });
  const refreshSequence = useRef(0);

  const refreshAuthState = () => {
    const sequence = ++refreshSequence.current;
    setAuthState({ status: "checking" });
    void getCurrentAuthState().then((nextState) => {
      if (sequence === refreshSequence.current) setAuthState(nextState);
    });
  };

  useEffect(() => {
    refreshAuthState();
  }, []);

  const value = useMemo(
    () => ({
      authState,
      isChecking: authState.status === "checking",
      isSignedIn: authState.status === "authenticated",
      refreshAuthState,
    }),
    [authState],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
