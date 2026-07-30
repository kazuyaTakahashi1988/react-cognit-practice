import { Navigate } from "react-router-dom";

import { useAuth } from "../utils/authHelper";

import type React from "react";

/* -----------------------------------------------
 * 認証状態に応じたルート制御
 * ----------------------------------------------- */

type RouteGuardProps = {
  children: React.ReactNode;
  requireAuth: boolean;
};

export const RouteGuard: React.FC<RouteGuardProps> = ({
  children,
  requireAuth,
}) => {
  const { authStatus, isSignedIn } = useAuth();

  // Cognito の確認が終わるまでは誤った画面へ遷移させない
  if (authStatus === "loading") return null;

  if (requireAuth && !isSignedIn) {
    return <Navigate replace to="/auth/signin" />;
  }

  if (!requireAuth && isSignedIn) {
    return <Navigate replace to="/auth/signout" />;
  }

  return children;
};
