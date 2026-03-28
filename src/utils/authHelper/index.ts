import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";

import { loadingFlagDown, loadingFlagUp, store } from "../store";

import type { TypeSignIn, TypeSignUp, TypeVerification } from "../../lib/types";

const userPool = new CognitoUserPool({
  UserPoolId: `${import.meta.env.VITE_APP_AWS_COGNITO_USER_POOL_ID}`,
  ClientId: `${import.meta.env.VITE_APP_AWS_COGNITO_CLIENT_ID}`,
});

/* -----------------------------------
 * サインイン 済 or 未 フラグ
 * -------------------------------- */
export const GetSignInFlag = () => userPool.getCurrentUser();

/* -----------------------------------
 * サインイン 処理
 * -------------------------------- */
export const SignInHelper = (data: TypeSignIn) => {
  store.dispatch(loadingFlagUp());

  const authenticationDetails = new AuthenticationDetails({
    Username: data.email,
    Password: data.password,
  });

  const cognitoUser = new CognitoUser({ Username: data.email, Pool: userPool });

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (result) => {
      const accessToken = result.getAccessToken().getJwtToken();
      console.warn("AccessToken: " + accessToken);
      store.dispatch(loadingFlagDown());
    },
    onFailure: (err) => {
      console.error(err);
      store.dispatch(loadingFlagDown());
    },
  });
};

/* -----------------------------------
 * サインアップ 処理
 * -------------------------------- */
export const SignUpHelper = (data: TypeSignUp) => {
  store.dispatch(loadingFlagUp());

  const attributeList = [new CognitoUserAttribute({ Name: "email", Value: data.email })];

  userPool.signUp(data.email, data.password, attributeList, [], (err, result) => {
    if (err) {
      console.error(err);
      store.dispatch(loadingFlagDown());
      return;
    }
    console.warn(result);
    console.warn("SignUp succeeded");
    store.dispatch(loadingFlagDown());
  });
};

/* -----------------------------------
 * アクティベート 処理
 * -------------------------------- */
export const VerifyHelper = (data: TypeVerification) => {
  store.dispatch(loadingFlagUp());

  const cognitoUser = new CognitoUser({ Username: data.email, Pool: userPool });

  cognitoUser.confirmRegistration(data.verificationCode, true, (err) => {
    if (err) {
      console.warn(err);
      store.dispatch(loadingFlagDown());
      return;
    }
    console.warn("verification succeeded");
    store.dispatch(loadingFlagDown());
  });
};

/* -----------------------------------
 * サインアウト 処理
 * -------------------------------- */
export const SignOutHelper = () => {
  store.dispatch(loadingFlagUp());

  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser) {
    cognitoUser.signOut();
    localStorage.clear();
    console.warn("signed out");
    store.dispatch(loadingFlagDown());
  } else {
    localStorage.clear();
    console.warn("no user signing in");
    store.dispatch(loadingFlagDown());
  }
};
