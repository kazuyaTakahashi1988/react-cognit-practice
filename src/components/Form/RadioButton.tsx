import React, { forwardRef } from "react";
import styled from "styled-components";
import { params } from "../../lib/Style";
import { TypeRadioButton } from "../../lib/Types";

import { Label } from "./Label";
import { ErrorMessage } from "./ErrorMessage";

type Props = React.InputHTMLAttributes<HTMLInputElement> & TypeRadioButton;

export const RadioButtonField: React.ForwardRefRenderFunction<
  HTMLInputElement,
  Props
> = (props, ref) => {
  const { label, options, errors, ...rest } = props;

  return (
    <Styled className={rest.className}>
      {label && <Label label={label} />}

      {options.map((option, index) => (
        <label htmlFor={rest.name + option.value} key={index} className="label">
          <input
            id={rest.name + option.value}
            value={option.value}
            ref={ref}
            {...rest}
            type="radio"
            className=""
          />
          <span className="label__text">{option.label}</span>
        </label>
      ))}

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
  .label {
    &__text {
      cursor: pointer;
      display: flex;
      align-items: center;
      color: ${params.gray100};
      &:before {
        content: "";
        display: inline-block;
        width: 1.2em;
        height: 1.2em;
        border: none;
        border-radius: 50%;
        margin-right: 6px;
        flex-shrink: 0;
        box-shadow: 0 0 0 1px ${params.gray};
      }
    }
    > input {
      position: absolute;
      top: 0;
      left: 0;
      width: 0px;
      height: 0px;
      white-space: nowrap;
      overflow: hidden;
      border: 0;
      padding: 0;
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      margin: -1px;
      pointer-events: none;
      opacity: 0;
      &:checked + .label__text {
        color: ${params.primary};
      }
      &:checked + .label__text:before {
        box-shadow: 0 0 0 1px ${params.primary};
        border: 0.35em solid ${params.primary};
      }
    }
  }
`;

export const RadioButton = forwardRef(RadioButtonField);
export default RadioButton;
