import React, { forwardRef } from "react";
import styled from "styled-components";
import { PropsInput } from "../../lib/props";
import { Label } from "./Label";
import { ErrorMessage } from "./ErrorMessage";

type Props = React.InputHTMLAttributes<HTMLInputElement> & PropsInput;

export const InputField: React.ForwardRefRenderFunction<
  HTMLInputElement,
  Props
> = (props, ref) => {
  const { label, type, placeholder, errors, ...rest } = props;

  return (
    <Styled>
      {label && <Label label={label} />}

      <input
        type={type || "text"}
        placeholder={placeholder}
        ref={ref}
        {...rest}
      />

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
    box-shadow: 0 0 0 1px #ccc;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    &:focus {
      outline: 0;
      box-shadow: 0 0 0 1px rgb(33, 150, 243);
    }
    &::placeholder {
      color: #666;
    }
  }
`;

export const Input = forwardRef(InputField);
export default Input;
