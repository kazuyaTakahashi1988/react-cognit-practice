import { Navigate } from "react-router-dom";

import { useAuth } from "../utils/authHelper";

import type React from "react";

type GuardProps = { children: React.ReactNode };

const AuthChecking = () => <p>認証状態を確認しています...</p>;

// 認証済みユーザーのみアクセス可能なルート
export const AuthGuard: React.FC<GuardProps> = ({ children }) => {
  const { isChecking, isSignedIn } = useAuth();

  if (isChecking) return <AuthChecking />;
  return isSignedIn ? children : <Navigate replace to="/auth/signin" />;
};

// 未認証ユーザーのみアクセス可能なルート
export const GuestGuard: React.FC<GuardProps> = ({ children }) => {
  const { isChecking, isSignedIn } = useAuth();

  if (isChecking) return <AuthChecking />;
  return isSignedIn ? <Navigate replace to="/auth/signout" /> : children;
};
