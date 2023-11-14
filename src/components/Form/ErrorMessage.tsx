import React from 'react';
import styled from 'styled-components'
import { PropsErrorMessage } from '../../lib/props';

export const ErrorMessage: React.FC<PropsErrorMessage> = (props): any => {
  const { errorMessage } = props;

  return (
    <Styled>
      {errorMessage && <label className='error'>{errorMessage}</label>}
    </Styled>
  )
};

const Styled = styled.div`
  .error{
    color: red;
    font-size: 12px;
    line-height: 28px;
    display: block;
  }
`;

export default ErrorMessage;