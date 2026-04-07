import { forwardRef } from "react";
import styled from "styled-components";

import { color } from "../../lib/style";

import type { TypeButton } from "../../lib/types";
import type React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & TypeButton;

/* -----------------------------------------------
 * ボタン
 * ----------------------------------------------- */

export const ButtonField: React.ForwardRefRenderFunction<HTMLButtonElement, Props> = (
  props,
  ref,
) => {
  const { children, ...rest } = props;

  return (
    <Styled {...rest} ref={ref} type="button">
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
  background: ${color.primary};
  color: ${color.white};
  &:hover {
    opacity: 0.6;
  }
  &.primary {
  }
  &.secondary {
    background: ${color.white};
    box-shadow: 0 0 0 1px ${color.gray};
    color: ${color.black};
  }
  &:disabled {
    cursor: not-allowed;
    background: ${color.gray};
    color: ${color.gray100};
    &:hover {
      opacity: 1;
    }
  }
`;

export const Button = forwardRef(ButtonField);
export default Button;
