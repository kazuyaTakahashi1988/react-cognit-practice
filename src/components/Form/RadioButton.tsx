import React, { forwardRef } from 'react';
import styled from 'styled-components'
import { PropsRadioButton } from '../../lib/props';
import { Label } from './Label';
import { ErrorMessage } from './ErrorMessage';

type Props = React.InputHTMLAttributes<HTMLInputElement> & PropsRadioButton;

export const RadioButtonField: React.ForwardRefRenderFunction<
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
            type="radio"
            id={rest.name + option.value}
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
      &:before {
      content: "";
        display: inline-block;
        width: 1.2em;
        height: 1.2em;
        border: 1px solid #ccc;
        border-radius: 50%;
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
        border: 0.35em solid rgb(33, 150, 243);
      }
    }
  }
`;

export const RadioButton = forwardRef(RadioButtonField);
export default RadioButton;