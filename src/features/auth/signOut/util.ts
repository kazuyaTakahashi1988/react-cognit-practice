/* -----------------------------------------------
 * ページ固有の処理
 * ----------------------------------------------- */

import { signOutHelper, useAuth } from "../../../utils/authHelper";
import { withGlobalLoading } from "../../../utils/loadingHelper";

/*
 * Sign Out のユースケース
 */
export const useSignOut = () => {
  const { refreshAuthState } = useAuth();

  const signOut = async () => {
    await withGlobalLoading(signOutHelper);
    refreshAuthState();
  };

  return { signOut };
};
