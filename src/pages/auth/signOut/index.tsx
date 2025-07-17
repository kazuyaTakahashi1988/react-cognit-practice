import styled from "styled-components";

import Layout from "../../../components/layout/layout";
import { SignOutHelper } from "../../../utils/authHelper";

import type React from "react";

const SignOut: React.FC = () => {
  const signOut = () => SignOutHelper();

  return (
    <Layout type="auth">
      <Styled>
        <h1>サインアウト</h1>
        <button type="button" onClick={signOut}>
          Sign Out
        </button>
      </Styled>
    </Layout>
  );
};

const Styled = styled.div`
  .clm {
    margin-top: 30px;
  }
`;

export default SignOut;
