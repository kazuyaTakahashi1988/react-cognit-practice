import styled from "styled-components";

import { useSignOut } from "./useSignOut";
import Button from "../../../components/button/button";
import ErrorMessage from "../../../components/form/errorMessage";
import Layout from "../../../components/layouts/layout";

import type React from "react";

/* -----------------------------------------------
 * SignOut ページ
 * ----------------------------------------------- */

const SignOut: React.FC = () => {
  const { errorMessage, isSubmitting, submit } = useSignOut();

  return (
    <Layout type="auth">
      <Styled>
        <h1>サインアウト</h1>

        <ErrorMessage className="mt-30" errorMessage={errorMessage} />

        <div className="mt-30">
          <Button disabled={isSubmitting} onClick={() => void submit()}>
            Sign Out
          </Button>
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
