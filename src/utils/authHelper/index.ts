import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";

import { loadingFlugStore } from '../../lib/store'
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
  loadingFlugStore.dispatch({ type: 'FLUG_UP' })

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
      loadingFlugStore.dispatch({ type: 'FLUG_DOWN' })
    },
    onFailure: (err) => {
      console.error(err);
      loadingFlugStore.dispatch({ type: 'FLUG_DOWN' })
    },
  });
};

/* -----------------------------------
 * サインアップ 処理
 * -------------------------------- */
export const SignUpHelper = (data: TypeSignUp) => {
  loadingFlugStore.dispatch({ type: 'FLUG_UP' })

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
        loadingFlugStore.dispatch({ type: 'FLUG_DOWN' })
        return;
      }
      console.log(result);
      console.log("SignUp succeeded");
      loadingFlugStore.dispatch({ type: 'FLUG_DOWN' })
    },
  );
};

/* -----------------------------------
 * アクティベート 処理
 * -------------------------------- */
export const VerifyHelper = (data: TypeVerification) => {
  loadingFlugStore.dispatch({ type: 'FLUG_UP' })

  const cognitoUser = new CognitoUser({
    Username: data.email,
    Pool: userPool,
  });

  cognitoUser.confirmRegistration(data.verificationCode, true, (err) => {
    if (err) {
      console.log(err);
      loadingFlugStore.dispatch({ type: 'FLUG_DOWN' })
      return;
    }
    console.log("verification succeeded");
    loadingFlugStore.dispatch({ type: 'FLUG_DOWN' })
  });
};

/* -----------------------------------
 * サインアウト 処理
 * -------------------------------- */
export const SignOutHelper = () => {
  loadingFlugStore.dispatch({ type: 'FLUG_UP' })

  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser) {
    cognitoUser.signOut();
    localStorage.clear();
    console.log("signed out");
    loadingFlugStore.dispatch({ type: 'FLUG_DOWN' })
  } else {
    localStorage.clear();
    console.log("no user signing in");
    loadingFlugStore.dispatch({ type: 'FLUG_DOWN' })
  }
};
