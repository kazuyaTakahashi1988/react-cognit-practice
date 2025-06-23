import React, { forwardRef } from "react";
import styled from "styled-components";

import { ErrorMessage } from "./errorMessage";
import { Label } from "./label";
import { params } from "../../lib/style";
import { TypeSwitchButton } from "../../lib/types";

type Props = React.InputHTMLAttributes<HTMLInputElement> & TypeSwitchButton;

export const SwitchButtonField: React.ForwardRefRenderFunction<HTMLInputElement, Props> = (
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
            type={rest.type ? rest.type : "checkbox"}
            disabled={option.disabled}
            className=""
          />
          <span className="label__text">
            <span className="circle"></span>
            <span className="no-active">{option.label}</span>
            <span className="actived">
              {option.labelActived ? option.labelActived : option.label}
            </span>
          </span>
        </label>
      ))}

      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
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
      .circle {
        display: flex;
        align-items: center;
        border-radius: 25px;
        height: 25px;
        width: 50px;
        margin-right: 6px;
        padding: 3px;
        transition: 0.2s;
        background: ${params.white};
        box-shadow: 0px 0px 1px 1px ${params.gray} inset;
        &:before {
          content: "";
          display: inline-block;
          width: 19px;
          height: 19px;
          border: none;
          border-radius: 20px;
          z-index: 1;
          transition: 0.2s;
          background: ${params.gray200};
        }
      }
      .no-active {
        display: block;
      }
      .actived {
        display: none;
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
        .circle::before {
          margin-left: calc(50% + 3px);
          background: ${params.primary};
        }
        .no-active {
          display: none;
        }
        .actived {
          display: block;
        }
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
          border-color: ${params.white};
        }
        &:checked {
          & + .label__text:before {
            box-shadow: 0 0 0 1px ${params.gray};
            background-color: ${params.white};
            border-color: ${params.gray};
          }
        }
      }
    }
  }
`;

export const SwitchButton = forwardRef(SwitchButtonField);
export default SwitchButton;
