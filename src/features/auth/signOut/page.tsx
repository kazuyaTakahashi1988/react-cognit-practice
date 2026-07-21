import { useState } from "react";
import styled from "styled-components";

import Button from "../../../components/button/button";
import { ErrorMessage } from "../../../components/form/errorMessage";
import Layout from "../../../components/layouts/layout";
import { signOutHelper, useAuth } from "../../../utils/authHelper";
import {
  loadingFlagDown,
  loadingFlagUp,
  store,
} from "../../../utils/storeHelper";

import type React from "react";

/* -----------------------------------------------
 * SignOut ページ
 * ----------------------------------------------- */

// メタ情報
export const pageMeta = {
  title: "Sign Out",
  description: "現在のセッションからサインアウトするページです。",
  sharePath: "/auth/signout",
  noindex: true, // SEO評価が無用なため noindex を指定
  // ogImage: "/xxxx/xxxx.jpg",
  // ogType: "website" or "article",
};

const SignOut: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { refreshAuthState } = useAuth();

  /*
   * 「Sign Out」ボタン 処理
   */
  const signOut = () => {
    store.dispatch(loadingFlagUp()); // ローディングフラグを上げる
    setErrorMessage("");

    /* Sign Out 処理 */
    signOutHelper()
      .then(() => {
        refreshAuthState(); // Auth情報 取得・更新処理
      })
      .catch((err: unknown) => {
        const message =
          err instanceof Error ? err.message : "Sign Out に失敗したよ...";
        setErrorMessage(message);
      })
      .finally(() => {
        store.dispatch(loadingFlagDown()); // ローディングフラグを下げる
      });
  };

  return (
    <Layout pageMeta={pageMeta} type="auth">
      <Styled>
        <h1>サインアウト</h1>

        {/* エラーメッセージ */}
        <ErrorMessage className="mt-30" errorMessage={errorMessage} />

        {/* ボタン */}
        <div className="mt-30">
          <Button onClick={signOut}>Sign Out</Button>
        </div>
      </Styled>
    </Layout>
  );
};

const Styled = styled.div`
  > .mt-30 {
    margin-top: 30px;
  }
`;

export default SignOut;
