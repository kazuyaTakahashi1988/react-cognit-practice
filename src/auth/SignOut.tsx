import React from 'react'
import '../App.css'

import { signOutHelper } from './'

const SignOut: React.FC = () => {
  const signOut = () => signOutHelper()

  return (
    <div className="SignOut">
      <h1>ログアウト</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}

export default SignOut
