import styled from "styled-components";

import Button from "../../../components/button/button";
import Layout from "../../../components/layouts/layout";
import { signOutHelper, useAuth } from "../../../utils/authHelper";

import type React from "react";

/* -----------------------------------------------
 * SignOut ページ
 * ----------------------------------------------- */

const SignOut: React.FC = () => {
  const { refreshAuthState } = useAuth();

  /*
   * 「Sign Out」ボタン 処理
   */
  const signOut = async () => {
    await signOutHelper(); // サインアウト処理
    refreshAuthState(); // 認証状態を更新する処理
  };

  return (
    <Layout
      meta={{
        title: "Sign Out",
        description: "現在のセッションからサインアウトするページです。",
        ogImage: "/vite.svg",
        shareText: "React Cognito Practice のサインアウトページです。",
      }}
      type="auth"
    >
      <Styled>
        <h1>サインアウト</h1>

        {/* ボタン */}
        <div className="mt-30">
          <Button onClick={signOut}>Sign Out</Button>
        </div>
      </Styled>
    </Layout>
  );
};

const Styled = styled.div`
  .mt-30 {
    margin-top: 30px;
  }
`;

export default SignOut;
