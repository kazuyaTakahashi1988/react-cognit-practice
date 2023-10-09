import React from 'react'
import '../App.css'

import { signInHelper } from './'

const SignIn: React.FC = () => {
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')

  const changedEmail = (e: any) => setEmail(e.target.value)
  const changedPassword = (e: any) => setPassword(e.target.value)

  const signIn = () => signInHelper(email, password)

  return (
    <div className="SignIn">
      <h1>ログイン</h1>
      <input type="email" placeholder='email' onChange={changedEmail} />
      <input type="password" placeholder='password' onChange={changedPassword} />
      <button onClick={signIn}>Sign In</button>
    </div>
  )
}

export default SignIn
