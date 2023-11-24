import React from 'react';
import styled from 'styled-components'

import Layout from '../../../components/Layout/Layout';
import { SignOutHelper } from '../../../utils/Auth';

const SignOut: React.FC = () => {
  const signOut = () => SignOutHelper();

  return (
    <Layout type="auth">
      <Styled>
        <h1>サインアウト</h1>
        <button onClick={signOut}>Sign Out</button>
      </Styled>
    </Layout>
  )
};

const Styled = styled.div`
  .clm{
    margin-top: 30px;
  }
`;

export default SignOut;
