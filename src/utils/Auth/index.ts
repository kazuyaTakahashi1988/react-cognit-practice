import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";

import { PropsSignIn, PropsSignUp, PropsVerification } from "../../lib/props";

const userPool = new CognitoUserPool({
  UserPoolId: `${process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID}`,
  ClientId: `${process.env.REACT_APP_AWS_COGNITO_CLIENT_ID}`,
});

/* -----------------------------------
 * サインイン 済 or 未 フラグ
 * -------------------------------- */
export const GetSignInFlag = () => userPool.getCurrentUser();

/* -----------------------------------
 * サインイン 処理
 * -------------------------------- */
export const SignInHelper = async (data: PropsSignIn) => {
  const authenticationDetails = new AuthenticationDetails({
    Username: data.email,
    Password: data.password,
  });

  const cognitoUser = new CognitoUser({
    Username: data.email,
    Pool: userPool,
  });

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (result) => {
      const accessToken = result.getAccessToken().getJwtToken();
      console.log(result);
      console.log("AccessToken: " + accessToken);
    },
    onFailure: (err) => {
      console.error(err);
    },
  });
};

/* -----------------------------------
 * サインアップ 処理
 * -------------------------------- */
export const SignUpHelper = (data: PropsSignUp) => {
  const attributeList = [
    new CognitoUserAttribute({
      Name: "email",
      Value: data.email,
    }),
  ];

  userPool.signUp(
    data.email,
    data.password,
    attributeList,
    [],
    (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(result);
      console.log("SignUp succeeded");
    },
  );
};

/* -----------------------------------
 * アクティベート 処理
 * -------------------------------- */
export const VerifyHelper = (data: PropsVerification) => {
  const cognitoUser = new CognitoUser({
    Username: data.email,
    Pool: userPool,
  });

  cognitoUser.confirmRegistration(data.verificationCode, true, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("verification succeeded");
  });
};

/* -----------------------------------
 * サインアウト 処理
 * -------------------------------- */
export const SignOutHelper = () => {
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser) {
    cognitoUser.signOut();
    localStorage.clear();
    console.log("signed out");
  } else {
    localStorage.clear();
    console.log("no user signing in");
  }
};
