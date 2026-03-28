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
import { useAuth } from "../utils/authHelper/authProvider";

import type React from "react";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Navigate to="/auth/signin" replace />;
  }

  return <>{children}</>;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Navigate to="/auth/signout" replace />;
  }

  return <>{children}</>;
};

export function Router() {
  const { isSignedIn } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/example/form_example" replace />} />
      <Route path="/example" element={<Navigate to="/example/form_example" replace />} />
      <Route path="/example/form_example" element={<FormExample />} />
      <Route path="/example/todo_example" element={<TodoExample />} />
      <Route path="/example/modal_example" element={<ModalExample />} />
      <Route path="/example/accordion_example" element={<AccordionExample />} />
      <Route path="/example/dropdownmenu_example" element={<DropdownMenuExample />} />
      <Route path="/*" element={<Navigate to="/" replace />} />

      {/*
       * auth 画面ルート設定
       */}
      <Route
        path="/auth"
        element={<Navigate to={isSignedIn ? "/auth/signout" : "/auth/signin"} replace />}
      />
      <Route
        path="/auth/signin"
        element={
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        }
      />
      <Route
        path="/auth/signup"
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
      />
      <Route
        path="/auth/verification"
        element={
          <PublicRoute>
            <Verification />
          </PublicRoute>
        }
      />
      <Route
        path="/auth/signout"
        element={
          <ProtectedRoute>
            <SignOut />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
