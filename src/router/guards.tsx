import { Navigate } from "react-router-dom";

import { useAuth } from "../utils/authHelper";

import type { AppRoute } from "./routeConfig";
import type React from "react";

type GuardProps = { children: React.ReactNode };

const AuthChecking = () => <p>認証状態を確認しています...</p>;

// 認証済みユーザーのみアクセス可なルート
const AuthGuard: React.FC<GuardProps> = ({ children }) => {
  const { isChecking, isSignedIn } = useAuth();

  if (isChecking) return <AuthChecking />;
  return isSignedIn ? children : <Navigate replace to="/auth/signin" />;
};

// 未認証ユーザーのみアクセス可なルート
const GuestGuard: React.FC<GuardProps> = ({ children }) => {
  const { isChecking, isSignedIn } = useAuth();

  if (isChecking) return <AuthChecking />;
  return isSignedIn ? <Navigate replace to="/auth/signout" /> : children;
};

/*
 * 認証状態に応じてルーティングを切り替える処理
 */
export const routeElement = ({ access, component: Page }: AppRoute) => {
  // auth: 認証済みユーザーのみアクセス可
  if (access === "auth")
    return (
      <AuthGuard>
        <Page />
      </AuthGuard>
    );
  // guest: 未認証ユーザーのみアクセス可
  if (access === "guest")
    return (
      <GuestGuard>
        <Page />
      </GuestGuard>
    );
  return <Page />;
};
