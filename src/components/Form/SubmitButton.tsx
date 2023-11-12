import React from 'react';
import styled from 'styled-components'
import { PropsSubmitButton } from '../../lib/props';

export const SubmitButton: React.FC<PropsSubmitButton> = (props): any => {
  const { children } = props;
  return (
    <Styled>
      <button>{children}</button>
    </Styled>
  )
};

const Styled = styled.div`
  button {
    height: 48px;
    width: 100%;
    padding: 0 16px;
    border-radius: 4px;
    border: 1px solid #ccc;
    background: rgb(33, 150, 243);
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    cursor: pointer;
    color: #fff;
    font-size: 16px;
    &:hover {
      background: rgba(33, 150, 243, 0.8);
    }
    &::placeholder { color: #666; }
  }
`;

export default SubmitButton;