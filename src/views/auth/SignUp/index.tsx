import React from 'react'
import '../../../App.css'

import { signUpHelper } from '../../../utils/auth'

const SignUp: React.FC = () => {
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')

  const changedEmail = (event: any) => setEmail(event.target.value)
  const changedPassword = (event: any) => setPassword(event.target.value)

  const signUp = () => signUpHelper(email, password)

  return (
    <div className="sign-up">
      <h1>サインアップ（ユーザー作成）</h1>
      <input type="email" placeholder="email" onChange={changedEmail} />
      <input type="password" placeholder="password" onChange={changedPassword} />
      <button onClick={signUp}>SignUp</button>
    </div>
  )
}

export default SignUp
