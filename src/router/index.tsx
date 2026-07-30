import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { RouteGuard } from "./routeGuard";
import PageLoading from "../components/loading/pageLoading";
import { useAuth } from "../utils/authHelper";
import { usePVTracking } from "../utils/gaHelper";

/* -----------------------------------------------
 * ルーティング設定
 * ページ単位で遅延読み込みし、初期バンドルを小さく保つ
 * ----------------------------------------------- */

const SignIn = lazy(() => import("../features/auth/signIn/page"));
const SignOut = lazy(() => import("../features/auth/signOut/page"));
const SignUp = lazy(() => import("../features/auth/signUp/page"));
const Verification = lazy(() => import("../features/auth/verification/page"));
const Error404 = lazy(() => import("../features/error/404/page"));
const Error500 = lazy(() => import("../features/error/500/page"));
const AccordionExample = lazy(
  () => import("../features/example/accordionExample/page"),
);
const DropdownMenuExample = lazy(
  () => import("../features/example/dropdownMenuExample/page"),
);
const FormExample = lazy(() => import("../features/example/formExample/page"));
const ModalExample = lazy(
  () => import("../features/example/modalExample/page"),
);
const StoreExample = lazy(
  () => import("../features/example/storeExample/page"),
);
const TodoExample = lazy(() => import("../features/example/todoExample/page"));

export function Router() {
  const { authStatus, isSignedIn } = useAuth();

  usePVTracking(); // GA4 PV計測処理

  if (authStatus === "loading") return <PageLoading />;

  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        {/* example 各ルート設定 */}
        <Route element={<FormExample />} path="/example/form_example" />
        <Route element={<TodoExample />} path="/example/todo_example" />
        <Route element={<ModalExample />} path="/example/modal_example" />
        <Route
          element={<AccordionExample />}
          path="/example/accordion_example"
        />
        <Route
          element={<DropdownMenuExample />}
          path="/example/dropdownmenu_example"
        />
        <Route element={<StoreExample />} path="/example/store_example" />

        {/* 未認証ユーザー向けルート */}
        <Route
          element={
            <RouteGuard requireAuth={false}>
              <SignIn />
            </RouteGuard>
          }
          path="/auth/signin"
        />
        <Route
          element={
            <RouteGuard requireAuth={false}>
              <SignUp />
            </RouteGuard>
          }
          path="/auth/signup"
        />
        <Route
          element={
            <RouteGuard requireAuth={false}>
              <Verification />
            </RouteGuard>
          }
          path="/auth/verification"
        />

        {/* 認証済みユーザー向けルート */}
        <Route
          element={
            <RouteGuard requireAuth>
              <SignOut />
            </RouteGuard>
          }
          path="/auth/signout"
        />

        {/* error 各ルート設定 */}
        <Route element={<Error404 />} path="/error/404" />
        <Route element={<Error500 />} path="/error/500" />

        {/* リダイレクト設定 */}
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
            <Navigate
              replace
              to={isSignedIn ? "/auth/signout" : "/auth/signin"}
            />
          }
          path="/auth"
        />
      </Routes>
    </Suspense>
  );
}
