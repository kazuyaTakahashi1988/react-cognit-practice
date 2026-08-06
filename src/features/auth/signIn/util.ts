/* -----------------------------------------------
 * ページ固有の処理
 * ----------------------------------------------- */

import { signInHelper, useAuth } from "../../../utils/authHelper";
import { withGlobalLoading } from "../../../utils/loadingHelper";

import type { SignInValues } from "./type";

/*
 * Sign In のユースケース
 */
export const useSignIn = () => {
  const { refreshAuthState } = useAuth();

  const signIn = async (data: SignInValues) => {
    const result = await withGlobalLoading(() => signInHelper(data));

    if (result.isSignedIn) {
      refreshAuthState();
    }

    return result;
  };

  return { signIn };
};
