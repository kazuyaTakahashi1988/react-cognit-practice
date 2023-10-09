import React from 'react'
import '../../App.css'

import { signOutHelper } from '../../auth'

const SignOut: React.FC = () => {
  const signOut = () => signOutHelper()

  return (
    <div className="sign-out">
      <h1>サインアウト</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}

export default SignOut
