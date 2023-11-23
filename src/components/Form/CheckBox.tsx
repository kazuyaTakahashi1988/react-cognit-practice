import React, { forwardRef } from 'react';
import styled from 'styled-components'
import { PropsCheckBox } from '../../lib/props';
import { Label } from './Label';
import { ErrorMessage } from './ErrorMessage';

type Props = React.InputHTMLAttributes<HTMLInputElement> & PropsCheckBox;

export const CheckBoxField: React.ForwardRefRenderFunction<
  HTMLInputElement,
  Props
> = (props, ref): any => {
  const { label, options, errors, ...rest } = props;

  return (
    <Styled>
      {label && <Label label={label} />}

      {options.map((option, index) => (
        <label
          htmlFor={rest.name + option.value}
          key={index}
          className="label"
        >
          <input
            type="checkbox"
            id={rest.name + option.value}
            value={option.value}
            ref={ref}
            {...rest}
          />
          <span className="label__text">
            {option.label}
          </span>
        </label>
      ))}

      {errors && Object.values(errors).map((error, index) => {
        return error.ref.name === rest.name && <ErrorMessage key={index} errorMessage={error.message} />
      })}
    </Styled>
  )
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
        color: rgb(33, 150, 243);
      }
      &:checked + .label__text:before {
        box-shadow: 0 0 0 1px rgb(33, 150, 243);
        background-color: rgb(33, 150, 243);
      }
      &:checked + .label__text:after {
        content: "";
        position: absolute;
        border: solid #fff;
        border-width: 0 2px 2px 0;
        left: 0.4em;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 0.4em;
        height: 0.65em;
        transform: translateY(-1px) rotate(45deg);
      }
    }
    &__text {
      cursor: pointer;
      color: #666;
      position: relative;
      display: flex;
      align-items: center;
      &::before {
        content: "";
        display: inline-block;
        width: 1.2em;
        height: 1.2em;
        border: none;
        box-shadow: 0 0 0 1px #ccc;
        border-radius: 3px;
        margin-right: 6px;
        flex-shrink: 0;
      }
    }
  }
`;

export const CheckBox = forwardRef(CheckBoxField);
export default CheckBox;