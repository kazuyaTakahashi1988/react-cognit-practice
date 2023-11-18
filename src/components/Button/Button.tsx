import React from 'react';
import styled from 'styled-components'
import { PropsButton } from '../../lib/props';

export const Button: React.FC<PropsButton> = (props): any => {
  const { type, onClick, isDisable, children  } = props;

  return (
    <Styled
      type='button'
      className={type ? type : "primary"}
      onClick={onClick}
      disabled={isDisable}
    >
      {children}
    </Styled>
  )
};

const Styled = styled.button`
  height: 2.4em;
  padding: 0 16px;
  border-radius: 4px;
  border: none;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  transition: 0.1s;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    opacity: 0.6;
  }
  &.primary {
    background: rgb(33, 150, 243);
    color: #fff;
  }
  &.secondary {
    background: #fff;
    box-shadow: 0 0 0 1px #ccc;
  }
  &:disabled{
    cursor:not-allowed;
    background: #ccc;
    color: #666;
    &:hover {
      opacity: 1;
    }
  }
`;

export default Button;