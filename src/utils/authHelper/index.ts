import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";

import { store } from "../store";
import { TypeSignIn, TypeSignUp, TypeVerification } from "../../lib/types";

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
export const SignInHelper = async (data: TypeSignIn) => {
  store.dispatch({ type: "LOADING_FLUG_UP" });

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
      store.dispatch({ type: "LOADING_FLUG_DOWN" });
    },
    onFailure: (err) => {
      console.error(err);
      store.dispatch({ type: "LOADING_FLUG_DOWN" });
    },
  });
};

/* -----------------------------------
 * サインアップ 処理
 * -------------------------------- */
export const SignUpHelper = (data: TypeSignUp) => {
  store.dispatch({ type: "LOADING_FLUG_UP" });

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
        store.dispatch({ type: "LOADING_FLUG_DOWN" });
        return;
      }
      console.log(result);
      console.log("SignUp succeeded");
      store.dispatch({ type: "LOADING_FLUG_DOWN" });
    },
  );
};

/* -----------------------------------
 * アクティベート 処理
 * -------------------------------- */
export const VerifyHelper = (data: TypeVerification) => {
  store.dispatch({ type: "LOADING_FLUG_UP" });

  const cognitoUser = new CognitoUser({
    Username: data.email,
    Pool: userPool,
  });

  cognitoUser.confirmRegistration(data.verificationCode, true, (err) => {
    if (err) {
      console.log(err);
      store.dispatch({ type: "LOADING_FLUG_DOWN" });
      return;
    }
    console.log("verification succeeded");
    store.dispatch({ type: "LOADING_FLUG_DOWN" });
  });
};

/* -----------------------------------
 * サインアウト 処理
 * -------------------------------- */
export const SignOutHelper = () => {
  store.dispatch({ type: "LOADING_FLUG_UP" });

  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser) {
    cognitoUser.signOut();
    localStorage.clear();
    console.log("signed out");
    store.dispatch({ type: "LOADING_FLUG_DOWN" });
  } else {
    localStorage.clear();
    console.log("no user signing in");
    store.dispatch({ type: "LOADING_FLUG_DOWN" });
  }
};
