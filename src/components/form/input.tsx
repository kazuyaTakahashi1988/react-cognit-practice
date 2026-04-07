import { forwardRef } from "react";
import styled from "styled-components";

import { ErrorMessage } from "./errorMessage";
import { Label } from "./label";
import { color } from "../../lib/style";

import type { TypeInput } from "../../lib/types";
import type React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & TypeInput;

/* -----------------------------------------------
 * インプット項目
 * ----------------------------------------------- */

export const InputField: React.ForwardRefRenderFunction<HTMLInputElement, Props> = (props, ref) => {
  const { label, errorMessage, ...rest } = props;

  return (
    <Styled className={rest.className}>
      <Label label={label} />

      <input {...rest} className="" ref={ref} type={rest.type || "text"} />

      <ErrorMessage errorMessage={errorMessage} />
    </Styled>
  );
};

const Styled = styled.div`
  input {
    height: 2.4em;
    width: 100%;
    padding: 0 16px;
    border-radius: 4px;
    border: none;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    box-shadow: 0 0 0 1px ${color.gray};
    &:focus {
      outline: 0;
      box-shadow: 0 0 0 1px ${color.primary};
    }
    &::placeholder {
      color: ${color.gray100};
    }
    &:disabled {
      cursor: not-allowed;
      background: ${color.gray};
      color: ${color.gray100};
    }
  }
`;

export const Input = forwardRef(InputField);
export default Input;
