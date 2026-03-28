import { createContext, useContext, useMemo, useState } from "react";

import { GetSignInFlag } from ".";

import type React from "react";

type TypeAuthContext = { isSignedIn: boolean; refreshAuthState: () => void };

const AuthContext = createContext<TypeAuthContext | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(GetSignInFlag());

  const refreshAuthState = () => {
    setIsSignedIn(GetSignInFlag());
  };

  const value = useMemo(() => ({ isSignedIn, refreshAuthState }), [isSignedIn]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
