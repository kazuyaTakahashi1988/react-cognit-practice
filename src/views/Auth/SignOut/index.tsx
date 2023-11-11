import React from 'react';
import '../../../App.css';
import styled from 'styled-components'

import { SignOutHelper } from '../../../utils/Auth';

const SignOut: React.FC = () => {
  const signOut = () => SignOutHelper();

  return (
    <Styled>
      <h1>サインアウト</h1>
      <button onClick={signOut}>Sign Out</button>
    </Styled>
  )
};

const Styled = styled.div`
  
`;

export default SignOut;
