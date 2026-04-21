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
import { usePVTracking } from "../utils/ga4Helper";

/* -----------------------------------------------
 * ルーティング設定
 * ----------------------------------------------- */

export function Router() {
  const { isSignedIn } = useAuth(); // サインインフラグ

  usePVTracking(); // GA4 PV計測処理

  return (
    <Routes>
      {/* ----------------------------------------
       * example 各ルート設定
       * ----------------------------------------- */}
      <Route element={<FormExample />} path="/example/form_example" />
      <Route element={<TodoExample />} path="/example/todo_example" />
      <Route element={<ModalExample />} path="/example/modal_example" />
      <Route element={<AccordionExample />} path="/example/accordion_example" />
      <Route element={<DropdownMenuExample />} path="/example/dropdownmenu_example" />

      {/* ----------------------------------------
       * auth 各ルート設定
       * ----------------------------------------- */}
      <Route
        element={!isSignedIn ? <SignIn /> : <Navigate replace to="/auth/signout" />}
        path="/auth/signin"
      />
      <Route
        element={!isSignedIn ? <SignUp /> : <Navigate replace to="/auth/signout" />}
        path="/auth/signup"
      />
      <Route
        element={!isSignedIn ? <Verification /> : <Navigate replace to="/auth/signout" />}
        path="/auth/verification"
      />
      <Route
        element={isSignedIn ? <SignOut /> : <Navigate replace to="/auth/signin" />}
        path="/auth/signout"
      />

      {/* ----------------------------------------
       * リダイレクト設定
       * ----------------------------------------- */}
      <Route
        // 存在しないパス遷移時はトップへリダイレクト
        element={<Navigate replace to="/" />}
        path="/*"
      />
      <Route
        // トップ遷移時は FormExampleページ へリダイレクト
        element={<Navigate replace to="/example/form_example" />}
        path="/"
      />
      <Route
        // パス /example 遷移時は FormExampleページ へリダイレクト
        element={<Navigate replace to="/example/form_example" />}
        path="/example"
      />
      <Route
        // パス /auth 遷移時はサインイン状態に応じ SignOut/SignInページ へリダイレクト
        element={<Navigate replace to={isSignedIn ? "/auth/signout" : "/auth/signin"} />}
        path="/auth"
      />
    </Routes>
  );
}
