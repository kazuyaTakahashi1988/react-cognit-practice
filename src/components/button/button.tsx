import { forwardRef } from "react";
import styled from "styled-components";

import { params } from "../../lib/style";

import type { TypeButton } from "../../lib/types";
import type React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & TypeButton;

export const ButtonField: React.ForwardRefRenderFunction<HTMLButtonElement, Props> = (
  props,
  ref,
) => {
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
  background: ${params.primary};
  color: ${params.white};
  &:hover {
    opacity: 0.6;
  }
  &.primary {
  }
  &.secondary {
    background: ${params.white};
    box-shadow: 0 0 0 1px ${params.gray};
    color: ${params.black};
  }
  &:disabled {
    cursor: not-allowed;
    background: ${params.gray};
    color: ${params.gray100};
    &:hover {
      opacity: 1;
    }
  }
`;

export const Button = forwardRef(ButtonField);
export default Button;
