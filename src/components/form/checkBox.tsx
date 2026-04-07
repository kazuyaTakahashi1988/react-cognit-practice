import { forwardRef } from "react";
import styled from "styled-components";

import { ErrorMessage } from "./errorMessage";
import { Label } from "./label";
import { color } from "../../lib/style";

import type { TypeCheckBox } from "../../lib/types";
import type React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & TypeCheckBox;

/* -----------------------------------------------
 * チェックボックス項目
 * ----------------------------------------------- */

export const CheckBoxField: React.ForwardRefRenderFunction<HTMLInputElement, Props> = (
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
            type="checkbox"
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
        background-color: ${color.primary};
      }
      &:checked + .label__text:after {
        content: "";
        position: absolute;
        left: 0.4em;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 0.4em;
        height: 0.65em;
        transform: translateY(-1px) rotate(45deg);
        border: solid;
        border-width: 0 2px 2px 0;
        border-color: ${color.white};
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
        }
        &:checked {
          & + .label__text:before {
            box-shadow: 0 0 0 1px ${color.gray};
          }
        }
      }
    }
    &__text {
      cursor: pointer;
      position: relative;
      display: flex;
      align-items: center;
      color: ${color.gray100};
      &::before {
        content: "";
        display: inline-block;
        width: 1.2em;
        height: 1.2em;
        border: none;
        border-radius: 3px;
        margin-right: 6px;
        flex-shrink: 0;
        box-shadow: 0 0 0 1px ${color.gray};
      }
    }
  }
`;

export const CheckBox = forwardRef(CheckBoxField);
export default CheckBox;
