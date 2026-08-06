/* -----------------------------------------------
 * ページ固有の処理
 * ----------------------------------------------- */

import { signUpHelper } from "../../../utils/authHelper";
import { withGlobalLoading } from "../../../utils/loadingHelper";

import type { SignUpValues } from "./type";

/*
 * Sign Up のユースケース
 */
export const useSignUp = () => {
  const signUp = (data: SignUpValues) =>
    withGlobalLoading(() => signUpHelper(data));

  return { signUp };
};
