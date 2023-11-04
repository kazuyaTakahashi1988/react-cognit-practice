import { Routes, Route, Navigate } from 'react-router-dom';

/* -----------------------------------
 * サインイン 済 or 未 フラグ 
 * -------------------------------- */
import { GetSignInFlag } from '../utils/auth'

/* -----------------------------------
 * VIEWS コンポーネント
 * -------------------------------- */
import Home from '../views';
import SignUp from '../views/auth/SignUp'
import Verification from '../views/auth/Verification'
import SignIn from '../views/auth/SignIn'
import SignOut from '../views/auth/SignOut'
import FormExample from '../views/FormExample'

export function Router() {
  return (
    <Routes>
      { GetSignInFlag() ?
        <>
          {
            /* -----------------------------------
             * ルーター設定（サインイン 済）
             * -------------------------------- */
          }
          <Route path="/" element={<Home />} />
          <Route path="/auth/signout" element={<SignOut />} />
          <Route path="/*" element={<Navigate to="/" replace />} />
        </>
        :
        <>
          {
            /* -----------------------------------
             * ルーター設定（サインイン 未）
             * -------------------------------- */
          }
          <Route path="/" element={<Navigate to="/form_example" replace />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/verification" element={<Verification />} />
          <Route path="/auth/form_example" element={<FormExample />} />
          <Route path="/*" element={<Navigate to="/" replace />} />
        </>
      }
    </Routes>
  );
}
