import React, { forwardRef } from 'react';
import styled from 'styled-components'
import { PropsCheckBox } from '../../lib/props';

type Props = React.InputHTMLAttributes<HTMLInputElement> & PropsCheckBox;

export const CheckBoxField: React.ForwardRefRenderFunction<
  HTMLInputElement,
  Props
> = (props, ref): any => {
  const { options, errorMessage, ...rest } = props;

  return (
    <Styled>
      {options.map((option, index) => (
        <label htmlFor={option.value} key={index}>
          <input
            type="checkbox"
            id={option.value}
            value={option.value}
            ref={ref}
            {...rest}
          />
          <span className="label">
            <span>{option.label}</span>
          </span>
        </label>
      ))}
      {errorMessage && <p className='error'>{errorMessage}</p>}
    </Styled>
  )
};

const Styled = styled.div`
  label {
    display: block;
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
  }
  .label {
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
  input:checked + .label {
    color: rgb(33, 150, 243);
  }
  input:checked + .label:before {
    border: 1px solid rgb(33, 150, 243);
    background-color: rgb(33, 150, 243);
  }
  input:checked + .label:after {
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
  input:focus-visible + .label span {
    background: linear-gradient(transparent 90%, rgba(33, 150, 243, 0.3) 90%);
  }
  .error{
    color: red;
    font-size: 12px;
    line-height: 28px;
    margin-top: 5px;
  }
`;

export const CheckBox = forwardRef(CheckBoxField);
