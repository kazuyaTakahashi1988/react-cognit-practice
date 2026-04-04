import { Navigate, Route, Routes } from "react-router-dom";

import SignIn from "../features/auth/signIn/page";
import SignOut from "../features/auth/signOut/page";
import SignUp from "../features/auth/signUp/page";
import Verification from "../features/auth/verification/page";
import AccordionExample from "../features/example/accordionExample/page";
import DropdownMenuExample from "../features/example/dropdownMenuExample/page";
import FormExample from "../features/example/formExample/page";
import ModalExample from "../features/example/modalExample/page";
import TodoExample from "../features/example/todoExample/page";
import { useAuth } from "../utils/authHelper";

import type React from "react";

/* -----------------------------------------------
 * ルーティング設定
 * ----------------------------------------------- */

// auth用：未サインイン時は SignIn ページへリダイレクトする処理
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isSignedIn } = useAuth(); // サインインフラグ

  if (!isSignedIn) {
    return <Navigate replace to="/auth/signin" />;
  }

  return <>{children}</>;
};

// auth用：サインイン時は SignOut ページへリダイレクトする処理
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isSignedIn } = useAuth(); // サインインフラグ

  if (isSignedIn) {
    return <Navigate replace to="/auth/signout" />;
  }

  return <>{children}</>;
};

/*
 * ルーティング設定
 * ルートの追加はここに記述していく
 */
export function Router() {
  const { isSignedIn } = useAuth(); // サインインフラグ

  return (
    <Routes>
      {/* ----------------------------------------
       * example 各ルート設定
       * ----------------------------------------- */}
      <Route element={<Navigate replace to="/" />} path="/*" />
      <Route element={<Navigate replace to="/example/form_example" />} path="/" />
      <Route element={<Navigate replace to="/example/form_example" />} path="/example" />
      <Route element={<FormExample />} path="/example/form_example" />
      <Route element={<TodoExample />} path="/example/todo_example" />
      <Route element={<ModalExample />} path="/example/modal_example" />
      <Route element={<AccordionExample />} path="/example/accordion_example" />
      <Route element={<DropdownMenuExample />} path="/example/dropdownmenu_example" />

      {/* ----------------------------------------
       * auth 各ルート設定
       * ----------------------------------------- */}
      <Route
        element={<Navigate replace to={isSignedIn ? "/auth/signout" : "/auth/signin"} />}
        path="/auth"
      />
      <Route
        element={
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        }
        path="/auth/signin"
      />
      <Route
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
        path="/auth/signup"
      />
      <Route
        element={
          <PublicRoute>
            <Verification />
          </PublicRoute>
        }
        path="/auth/verification"
      />
      <Route
        element={
          <ProtectedRoute>
            <SignOut />
          </ProtectedRoute>
        }
        path="/auth/signout"
      />
    </Routes>
  );
}
