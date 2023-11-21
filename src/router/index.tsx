import { Routes, Route, Navigate } from 'react-router-dom';

/* -----------------------------------
 * サインイン 済 or 未 フラグ 
 * -------------------------------- */
import { GetSignInFlag } from '../utils/Auth'

/* -----------------------------------
 * VIEWS コンポーネント
 * -------------------------------- */
import Home from '../views';
import SignUp from '../views/Auth/SignUp'
import Verification from '../views/Auth/Verification'
import SignIn from '../views/Auth/SignIn'
import SignOut from '../views/Auth/SignOut'
import FormExample from '../views/FormExample'
import ModalExample from '../views/ModalExample'
import AccordionExample from '../views/AccordionExample'
import DropdownMenuExample from '../views/DropdownMenuExample'

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
          <Route path="/form_example" element={<FormExample />} />
          <Route path="/modal_example" element={<ModalExample />} />
          <Route path="/accordion_example" element={<AccordionExample />} />
          <Route path="/dropdownmenu_example" element={<DropdownMenuExample />} />
          <Route path="/*" element={<Navigate to="/" replace />} />
        </>
      }
    </Routes>
  );
}
