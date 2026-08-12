import { Navigate } from "react-router-dom";

import PageMeta from "../components/layouts/pageMeta";
import { useAuth } from "../utils/authHelper";

import type { AppRoute } from "../lib/types";
import type React from "react";

type GuardProps = { children: React.ReactNode };

const AuthChecking = () => <p>認証状態を確認しています...</p>;

const AuthError: React.FC<{ onRetry: () => void }> = ({ onRetry }) => (
  <div role="alert">
    <p>認証状態を確認できませんでした。通信環境を確認してください。</p>
    <button onClick={onRetry} type="button">
      再試行
    </button>
  </div>
);

// 認証済みユーザーのみアクセス可とするガード処理
const AuthGuard: React.FC<GuardProps> = ({ children }) => {
  const { authState, refreshAuthState } = useAuth();

  if (authState.status === "checking") return <AuthChecking />;
  if (authState.status === "error")
    return <AuthError onRetry={refreshAuthState} />;
  return authState.status === "authenticated" ? (
    children
  ) : (
    <Navigate replace to="/auth/signin" />
  );
};

// 未認証ユーザーのみアクセス可とするガード処理
const GuestGuard: React.FC<GuardProps> = ({ children }) => {
  const { authState, refreshAuthState } = useAuth();

  if (authState.status === "checking") return <AuthChecking />;
  if (authState.status === "error")
    return <AuthError onRetry={refreshAuthState} />;
  return authState.status === "authenticated" ? (
    <Navigate replace to="/auth/signout" />
  ) : (
    children
  );
};

/*
 * ルート要素生成 処理
 */
export const routeElement = ({
  access,
  component: Page,
  pageMeta,
}: AppRoute) => {
  const routedPage = (
    <>
      <PageMeta {...pageMeta} />
      <Page />
    </>
  );

  // auth: 認証済みユーザーのみアクセス可
  if (access === "auth") return <AuthGuard>{routedPage}</AuthGuard>;
  // guest: 未認証ユーザーのみアクセス可
  if (access === "guest") return <GuestGuard>{routedPage}</GuestGuard>;
  return routedPage;
};
