import React, { forwardRef } from "react";
import styled from "styled-components";
import { PropsSwitchButton } from "../../lib/props";

import { Label } from "./Label";
import { ErrorMessage } from "./ErrorMessage";

type Props = React.InputHTMLAttributes<HTMLInputElement> & PropsSwitchButton;

export const SwitchButtonField: React.ForwardRefRenderFunction<
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
            type={rest.type ? rest.type : "checkbox"}
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
      color: #666;
      .circle {
        display: flex;
        align-items: center;
        background: #fff;
        border-radius: 25px;
        height: 25px;
        width: 50px;
        margin-right: 6px;
        box-shadow: 0px 0px 1px 1px #ccc inset;
        padding: 3px;
        transition: 0.2s;
        &:before {
          content: "";
          display: inline-block;
          width: 19px;
          height: 19px;
          border: none;
          border-radius: 20px;
          background: #ddd;
          z-index: 1;
          transition: 0.2s;
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
        color: rgb(33, 150, 243);
        .circle {
          box-shadow: none;
          background: rgba(33, 150, 243, 0.3);
          &::before {
            margin-left: calc(50% + 3px);
            background: rgb(33, 150, 243);
          }
        }
        .no-active {
          display: none;
        }
        .actived {
          display: block;
        }
      }
    }
  }
`;

export const SwitchButton = forwardRef(SwitchButtonField);
export default SwitchButton;
