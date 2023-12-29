import React, { forwardRef } from "react";
import styled from "styled-components";
import { params } from "../../lib/Style";
import { PropsInput } from "../../lib/Props";

import { Label } from "./Label";
import { ErrorMessage } from "./ErrorMessage";

type Props = React.InputHTMLAttributes<HTMLInputElement> & PropsInput;

export const InputField: React.ForwardRefRenderFunction<
  HTMLInputElement,
  Props
> = (props, ref) => {
  const { label, errors, ...rest } = props;

  return (
    <Styled className={rest.className}>
      {label && <Label label={label} />}

      <input ref={ref} {...rest} type={rest.type || "text"} className="" />

      {errors &&
        Object.values(errors).map((error, index) => {
          return (
            error.ref.name === rest.name && (
              <ErrorMessage key={index} errorMessage={error.message} />
            )
          );
        })}
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
  }
`;

export const Input = forwardRef(InputField);
export default Input;
