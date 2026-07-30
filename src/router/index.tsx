import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { AuthGuard, GuestGuard } from "./guards";
import { routeConfig } from "./routeConfig";
import { PageLoading } from "../components/loading/pageLoading";
import { useAuth } from "../utils/authHelper";
import { usePVTracking } from "../utils/gaHelper";

import type { AppRoute } from "./routeConfig";

// 認証状態に応じてルーティングを切り替える処理
const routeElement = ({ access, component: Page }: AppRoute) => {
  // auth: 認証済みユーザーのみアクセス可能
  if (access === "auth")
    return (
      <AuthGuard>
        <Page />
      </AuthGuard>
    );
  // guest: 未認証ユーザーのみアクセス可能
  if (access === "guest")
    return (
      <GuestGuard>
        <Page />
      </GuestGuard>
    );
  return <Page />;
};

/* -----------------------------------------------
 * ルーティング設定
 * ----------------------------------------------- */
export function Router() {
  const { isChecking, isSignedIn } = useAuth();
  usePVTracking();

  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        {/* ----------------------------------------
         * 各ルート設定（ページ追加時 routeConfig に追加）
         * ----------------------------------------- */}
        {routeConfig.map((route) => (
          <Route
            element={
              // 認証状態に応じてルーティングを切り替える処理
              routeElement(route)
            }
            key={route.path}
            path={route.path}
          />
        ))}

        {/* ----------------------------------------
         * リダイレクト設定
         * ----------------------------------------- */}
        <Route element={<Navigate replace to="/error/404" />} path="/*" />
        <Route
          element={<Navigate replace to="/example/form_example" />}
          path="/"
        />
        <Route
          element={<Navigate replace to="/example/form_example" />}
          path="/example"
        />
        <Route
          element={
            isChecking ? (
              <p>認証状態を確認しています...</p>
            ) : (
              <Navigate
                replace
                to={isSignedIn ? "/auth/signout" : "/auth/signin"}
              />
            )
          }
          path="/auth"
        />
      </Routes>
    </Suspense>
  );
}
