import React from 'react'
import '../App.css'

import { verifyHelper } from './'

const Verification: React.FC = () => {
  const [email, setEmail] = React.useState<string>('')
  const [verificationCode, setVerificationCode] = React.useState<string>('')

  const changedEmail = (event: any) => setEmail(event.target.value)
  const changedVerificationCode = (event: any) => setVerificationCode(event.target.value)

  const verify = () => verifyHelper(email, verificationCode)
  
  return (
    <div className="VerificationCode">
      <h1>アクティベートコード</h1>
      <input type="text" placeholder="verification code" onChange={changedVerificationCode} />
      <input type="text" placeholder='email' onChange={changedEmail} />
      <button onClick={verify}>Authenticate</button>
    </div>
  )
}

export default Verification
