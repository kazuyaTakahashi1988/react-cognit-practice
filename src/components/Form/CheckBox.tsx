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
          htmlFor={option.value}
          key={index}
          className="label"
        >
          <input
            type="checkbox"
            id={option.value}
            value={option.value}
            ref={ref}
            {...rest}
          />
          <span className="label__text">
            <span>{option.label}</span>
          </span>
        </label>
      ))}

      {errors && Object.values(errors).map(error => {
        return error.ref.name === rest.name && <ErrorMessage errorMessage={error.message} />
      })}
    </Styled>
  )
};

const Styled = styled.div`
  .label {
    display: block;
    cursor: pointer;
    &__text {
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      color: #666;
      position: relative;
      display: flex;
      align-items: center;
      &::before {
        content: "";
        display: inline-block;
        width: 1.2em;
        height: 1.2em;
        border: 1px solid #ccc;
        border-radius: 3px;
        margin-right: 6px;
        flex-shrink: 0;
      }
    }
    input {
      position: absolute;
      white-space: nowrap;
      width: 1px;
      height: 1px;
      overflow: hidden;
      border: 0;
      padding: 0;
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      margin: -1px;
      &:checked + .label__text {
        color: rgb(33, 150, 243);
      }
      &:checked + .label__text:before {
        border: 1px solid rgb(33, 150, 243);
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
      &:focus-visible + .label__text span {
        background: linear-gradient(transparent 90%, rgba(33, 150, 243, 0.3) 90%);
      }
    }
  }
`;

export const CheckBox = forwardRef(CheckBoxField);
export default CheckBox;