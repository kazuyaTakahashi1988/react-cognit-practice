import { Routes, Route, Navigate } from 'react-router-dom';

/* -----------------------------------
 * VIEWS コンポーネント
 * -------------------------------- */
import SignUp from '../views/Auth/SignUp'
import Verification from '../views/Auth/Verification'
import SignIn from '../views/Auth/SignIn'
import SignOut from '../views/Auth/SignOut'
import FormExample from '../views/Example/FormExample'
import ModalExample from '../views/Example/ModalExample'
import AccordionExample from '../views/Example/AccordionExample'
import DropdownMenuExample from '../views/Example/DropdownMenuExample'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/example/form_example" replace />} />
      <Route path="/auth" element={<Navigate to="/auth/signin" replace />} />
      <Route path="/auth/signin" element={<SignIn />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/auth/signout" element={<SignOut />} />
      <Route path="/auth/verification" element={<Verification />} />
      <Route path="/example" element={<Navigate to="/example/form_example" replace />} />
      <Route path="/example/form_example" element={<FormExample />} />
      <Route path="/example/modal_example" element={<ModalExample />} />
      <Route path="/example/accordion_example" element={<AccordionExample />} />
      <Route path="/example/dropdownmenu_example" element={<DropdownMenuExample />} />
      <Route path="/*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
