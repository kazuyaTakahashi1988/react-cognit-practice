import React, { forwardRef } from "react";
import styled from "styled-components";

import { ErrorMessage } from "./errorMessage";
import { Label } from "./label";
import { params } from "../../lib/style";
import { TypeInput } from "../../lib/types";

type Props = React.InputHTMLAttributes<HTMLInputElement> & TypeInput;

export const InputField: React.ForwardRefRenderFunction<HTMLInputElement, Props> = (props, ref) => {
  const { label, errorMessage, ...rest } = props;

  return (
    <Styled className={rest.className}>
      {label && <Label label={label} />}

      <input ref={ref} {...rest} type={rest.type || "text"} className="" />

      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
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
    box-shadow: 0 0 0 1px ${params.gray};
    &:focus {
      outline: 0;
      box-shadow: 0 0 0 1px ${params.primary};
    }
    &::placeholder {
      color: ${params.gray100};
    }
    &:disabled {
      cursor: not-allowed;
      background: ${params.gray};
      color: ${params.gray100};
    }
  }
`;

export const Input = forwardRef(InputField);
export default Input;
