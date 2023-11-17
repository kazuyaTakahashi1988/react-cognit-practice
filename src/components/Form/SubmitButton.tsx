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
    border: none;
    box-shadow: 0 0 0 1px rgb(33, 150, 243);
    background: rgb(33, 150, 243);
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    transition: 0.1s;
    cursor: pointer;
    color: #fff;
    font-size: 16px;
    &:hover {
      background: rgba(33, 150, 243, 0.6);
    }
    &::placeholder { color: #666; }
  }
`;

export default SubmitButton;