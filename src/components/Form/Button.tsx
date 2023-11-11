import React, { forwardRef } from 'react';
import styled from 'styled-components'
import { PropsButton } from '../../lib/props';

type Props = React.InputHTMLAttributes<HTMLButtonElement> & PropsButton;

export const ButtonField: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  Props
> = (props, ref): any => {
  const { children } = props;
  return (
    <Styled>
      <button ref={ref}>{children}</button>
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
    &:hover {
      background: rgba(33, 150, 243, 0.8);
    }
    &::placeholder { color: #666; }
  }
`;

export const Button = forwardRef(ButtonField);
