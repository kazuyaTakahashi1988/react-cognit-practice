import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { routeElement } from "./guards";
import routeConfig from "./routeConfig";
import PageLoading from "../components/loading/pageLoading";
import { useAuth } from "../utils/authHelper";
import { usePVTracking } from "../utils/gaHelper";

/* -----------------------------------------------
 * ルーティング設定
 * ----------------------------------------------- */

export function Router() {
  const { isChecking, isSignedIn } = useAuth(); // サインインフラグ

  usePVTracking(); // GA4 PV計測処理

  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        {/* ----------------------------------------
         * 各ルート設定
         * （ルート追加は routeConfig.tsx を編集）
         * ----------------------------------------- */}
        {routeConfig.map((route) => (
          <Route
            element={routeElement(route)}
            key={route.path}
            path={route.path}
          />
        ))}

        {/* ----------------------------------------
         * リダイレクト設定
         * ----------------------------------------- */}
        <Route
          // 存在しないパス遷移時は404ページへリダイレクト
          element={<Navigate replace to="/error/404" />}
          path="/*"
        />
        <Route
          // ルート遷移時は FormExampleページ へリダイレクト
          element={<Navigate replace to="/example/form_example" />}
          path="/"
        />
        <Route
          // ルート/example 遷移時は FormExampleページ へリダイレクト
          element={<Navigate replace to="/example/form_example" />}
          path="/example"
        />
        <Route
          // ルート/auth 遷移時はサインイン状態に応じ SignOut/SignInページ へリダイレクト
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
