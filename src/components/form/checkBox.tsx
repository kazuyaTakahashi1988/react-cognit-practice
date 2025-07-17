import { forwardRef } from "react";
import styled from "styled-components";

import { ErrorMessage } from "./errorMessage";
import { Label } from "./label";
import { params } from "../../lib/style";

import type { TypeCheckBox } from "../../lib/types";
import type React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & TypeCheckBox;

export const CheckBoxField: React.ForwardRefRenderFunction<HTMLInputElement, Props> = (
  props,
  ref
) => {
  const { label, options, errorMessage, ...rest } = props;

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
            type="checkbox"
            disabled={option.disabled}
            className=""
          />
          <span className="label__text">{option.label}</span>
        </label>
      ))}

      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
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
        color: ${params.primary};
      }
      &:checked + .label__text:before {
        box-shadow: 0 0 0 1px ${params.primary};
        background-color: ${params.primary};
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
        border-color: ${params.white};
      }
      &:disabled {
        cursor: not-allowed;
        * {
          cursor: not-allowed;
        }
        & + .label__text {
          color: ${params.gray};
        }
        & + .label__text:before {
          background-color: ${params.gray};
        }
        &:checked {
          & + .label__text:before {
            box-shadow: 0 0 0 1px ${params.gray};
          }
        }
      }
    }
    &__text {
      cursor: pointer;
      position: relative;
      display: flex;
      align-items: center;
      color: ${params.gray100};
      &::before {
        content: "";
        display: inline-block;
        width: 1.2em;
        height: 1.2em;
        border: none;
        border-radius: 3px;
        margin-right: 6px;
        flex-shrink: 0;
        box-shadow: 0 0 0 1px ${params.gray};
      }
    }
  }
`;

export const CheckBox = forwardRef(CheckBoxField);
export default CheckBox;
