import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js"
import awsConfiguration from '../awsConfiguration'

const userPool = new CognitoUserPool({
  UserPoolId: awsConfiguration.UserPoolId,
  ClientId: awsConfiguration.ClientId,
})

/* -----------------------------------
 * サインイン
 * -------------------------------- */
export const signInHelper = (email: string, password: string) => {
  const authenticationDetails = new AuthenticationDetails({
    Username: email,
    Password: password
  })
  const cognitoUser = new CognitoUser({
    Username: email,
    Pool: userPool
  })

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (result) => {
      const accessToken = result.getAccessToken().getJwtToken()
      console.log(result)
      console.log('AccessToken: ' + accessToken)
    },
    onFailure: (err) => {
      console.error(err)
    }
  })
}

/* -----------------------------------
 * サインアップ
 * -------------------------------- */
export const signUpHelper = (email: string, password: string) => {
  const attributeList = [
    new CognitoUserAttribute({
      Name: 'email',
      Value: email
    })
  ]
  userPool.signUp(email, password, attributeList, [], (err, result) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('SignUp succeeded')
    // setEmail('')
    // setVerificationCode('')
  })
}

/* -----------------------------------
 * アクティベート
 * -------------------------------- */
export const verifyHelper = (email: string, verificationCode: string) => {
  const cognitoUser = new CognitoUser({
    Username: email,
    Pool: userPool
  })
  cognitoUser.confirmRegistration(verificationCode, true, (err: any) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('verification succeeded')
    // setEmail('')
    // setVerificationCode('')
  })
}

/* -----------------------------------
 * サインアウト
 * -------------------------------- */
export const signOutHelper = () => {
  const cognitoUser = userPool.getCurrentUser()
  if (cognitoUser) {
    cognitoUser.signOut()
    localStorage.clear()
    console.log('signed out')
  } else {
    localStorage.clear()
    console.log('no user signing in')
  }
}