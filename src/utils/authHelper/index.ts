import { Amplify } from "aws-amplify";
import { confirmSignUp, signIn, signOut, signUp } from "aws-amplify/auth";
import { useContext } from "react";

import { AuthContext } from "../providerHelper/authProvider";

import type {
  TypeSignInResult,
  TypeSignInValues,
  TypeSignUpResult,
  TypeSignUpValues,
  TypeVerifyValues,
} from "../../lib/types";

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isSignInResponse = (value: unknown): value is TypeSignInResult =>
  isObject(value) && ("isSignedIn" in value || "nextStep" in value || "userId" in value);

const isSignUpResponse = (value: unknown): value is TypeSignUpResult =>
  isObject(value) && ("isSignUpComplete" in value || "nextStep" in value || "userId" in value);

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
export const signInHelper = async (data: TypeSignInValues): Promise<TypeSignInResult> => {
  const result: unknown = await signIn({ username: data.email, password: data.password });

  if (!isSignInResponse(result)) {
    throw new Error("Unexpected sign in response");
  }

  return result;
};

/*
 * サインアップ 処理
 */
export const signUpHelper = async (data: TypeSignUpValues): Promise<TypeSignUpResult> => {
  const result: unknown = await signUp({
    username: data.email,
    password: data.password,
    options: { userAttributes: { email: data.email } },
  });

  if (!isSignUpResponse(result)) {
    throw new Error("Unexpected sign up response");
  }

  return result;
};

/*
 * ベリファイ 処理
 */
export const verifyHelper = async (data: TypeVerifyValues): Promise<void> => {
  await confirmSignUp({ username: data.email, confirmationCode: data.verificationCode });
};

/*
 * サインアウト 処理
 */

export const signOutHelper = async (): Promise<void> => {
  await signOut();
  localStorage.clear();
};
