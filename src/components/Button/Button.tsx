import React, { forwardRef } from "react";
import styled from "styled-components";
import { PropsButton } from "../../lib/props";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & PropsButton;

export const ButtonField: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  Props
> = (props, ref) => {
  const { children, ...rest } = props;

  return (
    <Styled ref={ref} {...rest} type="button">
      {children}
    </Styled>
  );
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
  background: rgb(33, 150, 243);
  color: #fff;
  &:hover {
    opacity: 0.6;
  }
  &.primary {
  }
  &.secondary {
    background: #fff;
    box-shadow: 0 0 0 1px #ccc;
    color: #000;
  }
  &:disabled {
    cursor: not-allowed;
    background: #ccc;
    color: #666;
    &:hover {
      opacity: 1;
    }
  }
`;

export const Button = forwardRef(ButtonField);
export default Button;
