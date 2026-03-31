import { Navigate, Route, Routes } from "react-router-dom";

/* -----------------------------------
 * PAGES コンポーネント
 * -------------------------------- */
import SignIn from "../pages/auth/signIn";
import SignOut from "../pages/auth/signOut";
import SignUp from "../pages/auth/signUp";
import Verification from "../pages/auth/verification";
import AccordionExample from "../pages/example/accordionExample";
import DropdownMenuExample from "../pages/example/dropdownMenuExample";
import FormExample from "../pages/example/formExample";
import ModalExample from "../pages/example/modalExample";
import TodoExample from "../pages/example/todoExample";
import { useAuth } from "../utils/authHelper";

import type React from "react";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Navigate replace to="/auth/signin" />;
  }

  return <>{children}</>;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Navigate replace to="/auth/signout" />;
  }

  return <>{children}</>;
};

export function Router() {
  const { isSignedIn } = useAuth();

  return (
    <Routes>
      <Route element={<Navigate replace to="/example/form_example" />} path="/" />
      <Route element={<Navigate replace to="/example/form_example" />} path="/example" />
      <Route element={<FormExample />} path="/example/form_example" />
      <Route element={<TodoExample />} path="/example/todo_example" />
      <Route element={<ModalExample />} path="/example/modal_example" />
      <Route element={<AccordionExample />} path="/example/accordion_example" />
      <Route element={<DropdownMenuExample />} path="/example/dropdownmenu_example" />
      <Route element={<Navigate replace to="/" />} path="/*" />

      {/*
       * auth 画面ルート設定
       */}
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
