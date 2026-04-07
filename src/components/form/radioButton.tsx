import { forwardRef } from "react";
import styled from "styled-components";

import { ErrorMessage } from "./errorMessage";
import { Label } from "./label";
import { color } from "../../lib/style";

import type { TypeRadioButton } from "../../lib/types";
import type React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & TypeRadioButton;

/* -----------------------------------------------
 * ラジオボタン項目
 * ----------------------------------------------- */

export const RadioButtonField: React.ForwardRefRenderFunction<HTMLInputElement, Props> = (
  props,
  ref,
) => {
  const { label, options, errorMessage, ...rest } = props;

  return (
    <Styled className={rest.className}>
      <Label label={label} />

      {options.map((option, index) => (
        <label className="label" htmlFor={rest.name + option.value} key={index}>
          <input
            {...rest}
            className=""
            disabled={rest.disabled || option.disabled}
            id={rest.name + option.value}
            ref={ref}
            type="radio"
            value={option.value}
          />
          <span className="label__text">{option.label}</span>
        </label>
      ))}

      <ErrorMessage errorMessage={errorMessage} />
    </Styled>
  );
};

const Styled = styled.div`
  .label {
    &__text {
      cursor: pointer;
      display: flex;
      align-items: center;
      color: ${color.gray100};
      &:before {
        content: "";
        display: inline-block;
        width: 1.2em;
        height: 1.2em;
        border: none;
        border-radius: 50%;
        margin-right: 6px;
        flex-shrink: 0;
        box-shadow: 0 0 0 1px ${color.gray};
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
        color: ${color.primary};
      }
      &:checked + .label__text:before {
        box-shadow: 0 0 0 1px ${color.primary};
        border: 0.35em solid ${color.primary};
      }
      &:disabled {
        cursor: not-allowed;
        * {
          cursor: not-allowed;
        }
        & + .label__text {
          color: ${color.gray};
        }
        & + .label__text:before {
          background-color: ${color.gray};
          border-color: ${color.white};
        }
        &:checked {
          & + .label__text:before {
            box-shadow: 0 0 0 1px ${color.gray};
            background-color: ${color.white};
            border-color: ${color.gray};
          }
        }
      }
    }
  }
`;

export const RadioButton = forwardRef(RadioButtonField);
export default RadioButton;
