import { Amplify } from "aws-amplify";
import { confirmSignUp, signIn, signOut, signUp } from "aws-amplify/auth";
import { useContext } from "react";

import { AuthContext } from "../providerHelper/authProvider";
import { withGlobalLoading } from "../storeHelper";

import type { TypeSignInValues, TypeSignUpValues, TypeVerifyValues } from "../../lib/types";

/* -----------------------------------------------
 * Amplify および Cognito Auth 処理
 * ----------------------------------------------- */

/*
 * Amplify 設定
 */
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_APP_AWS_COGNITO_USER_POOL_ID ?? "",
      userPoolClientId: import.meta.env.VITE_APP_AWS_COGNITO_CLIENT_ID ?? "",
      identityPoolId: import.meta.env.VITE_APP_AWS_COGNITO_IDENTITY_POOL_ID ?? "",
    },
  },
});

/*
 * サインイン状態の更新・取得など
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

/*
 * サインイン 処理
 */
export const signInHelper = async (data: TypeSignInValues) => {
  return withGlobalLoading(async () => {
    try {
      const result = await signIn({ username: data.email, password: data.password });
      console.warn("SignIn succeeded", result);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  });
};

/*
 * サインアップ 処理
 */
export const signUpHelper = async (data: TypeSignUpValues) => {
  return withGlobalLoading(async () => {
    try {
      const result = await signUp({
        username: data.email,
        password: data.password,
        options: { userAttributes: { email: data.email } },
      });
      console.warn(result);
      console.warn("SignUp succeeded");
    } catch (err) {
      console.error(err);
    }
  });
};

/*
 * ベリファイ 処理
 */
export const verifyHelper = async (data: TypeVerifyValues) => {
  return withGlobalLoading(async () => {
    try {
      await confirmSignUp({ username: data.email, confirmationCode: data.verificationCode });
      console.warn("verification succeeded");
    } catch (err) {
      console.warn(err);
    }
  });
};

/*
 * サインアウト 処理
 */
export const signOutHelper = async () => {
  return withGlobalLoading(async () => {
    try {
      await signOut();
      localStorage.clear();
      console.warn("signed out");
      return true;
    } catch (err) {
      console.warn(err);
      localStorage.clear();
      return false;
    }
  });
};
