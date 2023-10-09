import { Routes, Route, Navigate } from 'react-router-dom';

/* -----------------------------------
 * サインインフラグ - 済 or 未 - 
 * -------------------------------- */
import { getSignInFlag } from '../utils/auth'

/* -----------------------------------
 * VIEWS コンポーネント
 * -------------------------------- */
import Home from '../views';
import SignUp from '../views/auth/SignUp'
import Verification from '../views/auth/Verification'
import SignIn from '../views/auth/SignIn'
import SignOut from '../views/auth/SignOut'

export function Router() {

  if (getSignInFlag()) {
    /* -----------------------------------
     * ルーター設定（サインイン - 済）
     * -------------------------------- */
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signout" element={<SignOut />} />
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  } else {
    /* -----------------------------------
     * ルーター設定（サインイン - 未）
     * -------------------------------- */
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/auth/signin" replace />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/verification" element={<Verification />} />
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }
}
