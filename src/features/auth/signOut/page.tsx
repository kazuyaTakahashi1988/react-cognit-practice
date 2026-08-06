import { useState } from "react";
import styled from "styled-components";

import { useSignOut } from "./util";
import Button from "../../../components/button/button";
import ErrorMessage from "../../../components/form/errorMessage";
import Layout from "../../../components/layouts/layout";

import type React from "react";

/* -----------------------------------------------
 * SignOut ページ
 * ----------------------------------------------- */

const SignOut: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { signOut } = useSignOut();

  /*
   * 「Sign Out」ボタン 処理
   */
  const onSignOut = async () => {
    setErrorMessage("");

    try {
      await signOut();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Sign Out に失敗したよ...";
      setErrorMessage(message);
    }
  };

  return (
    <Layout type="auth">
      <Styled>
        <h1>サインアウト</h1>

        {/* エラーメッセージ */}
        <ErrorMessage className="mt-30" errorMessage={errorMessage} />

        {/* ボタン */}
        <div className="mt-30">
          <Button onClick={onSignOut}>Sign Out</Button>
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
