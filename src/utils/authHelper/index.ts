import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";
import { useContext } from "react";

import { loadingFlagDown, loadingFlagUp, store } from "../store";
import { AuthContext } from "./authProvider";

import type { TypeSignIn, TypeSignUp, TypeVerification } from "../../lib/types";

export const userPool = new CognitoUserPool({
  UserPoolId: `${import.meta.env.VITE_APP_AWS_COGNITO_USER_POOL_ID}`,
  ClientId: `${import.meta.env.VITE_APP_AWS_COGNITO_CLIENT_ID}`,
});

/* -----------------------------------
 * サインイン 済 or 未 フラグ
 * -------------------------------- */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

/* -----------------------------------
 * サインイン 処理
 * -------------------------------- */
export const SignInHelper = async (data: TypeSignIn) =>
  await new Promise<boolean>((resolve) => {
    store.dispatch(loadingFlagUp());

    const authenticationDetails = new AuthenticationDetails({
      Username: data.email,
      Password: data.password,
    });

    const cognitoUser = new CognitoUser({ Username: data.email, Pool: userPool });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: () => {
        console.warn("SignIn succeeded");
        store.dispatch(loadingFlagDown());
        resolve(true);
      },
      onFailure: (err) => {
        console.error(err);
        store.dispatch(loadingFlagDown());
        resolve(false);
      },
    });
  });

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
export const SignOutHelper = async () =>
  await new Promise<boolean>((resolve) => {
    store.dispatch(loadingFlagUp());

    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
      localStorage.clear();
      console.warn("signed out");
      store.dispatch(loadingFlagDown());
      resolve(true);
    } else {
      localStorage.clear();
      console.warn("no user signing in");
      store.dispatch(loadingFlagDown());
      resolve(false);
    }
  });
