import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { AuthGuard, GuestGuard } from "./guards";
import { routeConfig } from "./routeConfig";
import { useAuth } from "../utils/authHelper";
import { usePVTracking } from "../utils/gaHelper";

import type { AppRoute } from "./routeConfig";

const routeElement = ({ access, component: Page }: AppRoute) => {
  if (access === "auth")
    return (
      <AuthGuard>
        <Page />
      </AuthGuard>
    );
  if (access === "guest")
    return (
      <GuestGuard>
        <Page />
      </GuestGuard>
    );
  return <Page />;
};

export function Router() {
  const { isChecking, isSignedIn } = useAuth();
  usePVTracking();

  return (
    <Suspense fallback={<p>ページを読み込んでいます...</p>}>
      <Routes>
        {routeConfig.map((route) => (
          <Route
            element={routeElement(route)}
            key={route.path}
            path={route.path}
          />
        ))}
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
