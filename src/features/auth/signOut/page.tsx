import styled from "styled-components";

import Button from "../../../components/button/button";
import Layout from "../../../components/layout/layout";
import { signOutHelper, useAuth } from "../../../utils/authHelper";

import type React from "react";

/* -----------------------------------------------
 * [ root ] /auth/signout ページ
 * ----------------------------------------------- */

const SignOut: React.FC = () => {
  const { refreshAuthState } = useAuth();
  const signOut = async () => {
    await signOutHelper();
    refreshAuthState();
  };

  return (
    <Layout type="auth">
      <Styled>
        <h1>サインアウト</h1>
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
