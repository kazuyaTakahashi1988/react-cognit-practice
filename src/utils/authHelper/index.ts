import { Amplify } from "aws-amplify";
import { confirmSignUp, getCurrentUser, signIn, signOut, signUp } from "aws-amplify/auth";
import { useContext } from "react";

import { loadingFlagDown, loadingFlagUp, store } from "../store";
import { AuthContext } from "./authProvider";

import type { TypeSignIn, TypeSignUp, TypeVerify } from "../../lib/types";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: `${import.meta.env.VITE_APP_AWS_COGNITO_USER_POOL_ID}`,
      userPoolClientId: `${import.meta.env.VITE_APP_AWS_COGNITO_CLIENT_ID}`,
      identityPoolId: `${import.meta.env.VITE_APP_AWS_COGNITO_IDENTITY_POOL_ID}`,
    },
  },
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

export const getCurrentSignInFlag = async () => {
  try {
    await getCurrentUser();
    return true;
  } catch {
    return false;
  }
};

/* -----------------------------------
 * サインイン 処理
 * -------------------------------- */
export const SignInHelper = async (data: TypeSignIn) => {
  store.dispatch(loadingFlagUp());

  try {
    const result = await signIn({ username: data.email, password: data.password });
    console.warn("SignIn succeeded", result);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  } finally {
    store.dispatch(loadingFlagDown());
  }
};

/* -----------------------------------
 * サインアップ 処理
 * -------------------------------- */
export const SignUpHelper = async (data: TypeSignUp) => {
  store.dispatch(loadingFlagUp());

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
  } finally {
    store.dispatch(loadingFlagDown());
  }
};

/* -----------------------------------
 * アクティベート 処理
 * -------------------------------- */
export const VerifyHelper = async (data: TypeVerify) => {
  store.dispatch(loadingFlagUp());

  try {
    await confirmSignUp({ username: data.email, confirmationCode: data.verificationCode });
    console.warn("verification succeeded");
  } catch (err) {
    console.warn(err);
  } finally {
    store.dispatch(loadingFlagDown());
  }
};

/* -----------------------------------
 * サインアウト 処理
 * -------------------------------- */
export const SignOutHelper = async () => {
  store.dispatch(loadingFlagUp());

  try {
    await signOut();
    localStorage.clear();
    console.warn("signed out");
    return true;
  } catch (err) {
    console.warn(err);
    localStorage.clear();
    return false;
  } finally {
    store.dispatch(loadingFlagDown());
  }
};
