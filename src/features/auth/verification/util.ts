/* -----------------------------------------------
 * ページ固有の処理
 * ----------------------------------------------- */

import { verifyHelper } from "../../../utils/authHelper";
import { withGlobalLoading } from "../../../utils/loadingHelper";

import type { VerifyValues } from "./type";

/*
 * Verification のユースケース
 */
export const useVerification = () => {
  const verify = (data: VerifyValues) =>
    withGlobalLoading(() => verifyHelper(data));

  return { verify };
};
