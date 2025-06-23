import { Routes, Route, Navigate } from "react-router-dom";

/* -----------------------------------
 * サインイン 済 or 未 フラグ
 * -------------------------------- */

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
import { GetSignInFlag } from "../utils/authHelper";

export function Router() {
  return (
    <Routes>
      {GetSignInFlag() ? (
        <>
          {/* -----------------------------------
           * ルーター設定（サインイン 済）
           * -------------------------------- */}
          <Route path="/" element={<Navigate to="/auth/signout" replace />} />
          <Route path="/auth" element={<Navigate to="/auth/signout" replace />} />
          <Route path="/auth/signout" element={<SignOut />} />
        </>
      ) : (
        <>
          {/* -----------------------------------
           * ルーター設定（サインイン 未）
           * -------------------------------- */}
          <Route path="/" element={<Navigate to="/example/form_example" replace />} />
          <Route path="/auth" element={<Navigate to="/auth/signin" replace />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/verification" element={<Verification />} />
        </>
      )}
      <Route path="/example" element={<Navigate to="/example/form_example" replace />} />
      <Route path="/example/form_example" element={<FormExample />} />
      <Route path="/example/todo_example" element={<TodoExample />} />
      <Route path="/example/modal_example" element={<ModalExample />} />
      <Route path="/example/accordion_example" element={<AccordionExample />} />
      <Route path="/example/dropdownmenu_example" element={<DropdownMenuExample />} />
      <Route path="/*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
