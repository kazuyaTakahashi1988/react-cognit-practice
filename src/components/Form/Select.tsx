import React, { forwardRef } from 'react';
import styled from 'styled-components'
import { PropsSelect } from '../../lib/props';

type Props = React.InputHTMLAttributes<HTMLSelectElement> & PropsSelect;

export const SelectField: React.ForwardRefRenderFunction<
  HTMLSelectElement,
  Props
> = (props, ref): any => {
  const { options, placeholder, errorMessage, ...rest } = props;
  return (
    <Styled>
      <select ref={ref} {...rest}>
        { placeholder && <option value='' hidden>{ placeholder }</option>}
        {options.map((option, index) => (
          <option
            value={option.value}
            key={index}
          >
            {option.label}
          </option>
        ))}
      </select>
      {errorMessage && <p className='error'>{errorMessage}</p>}
    </Styled>
  )
};

const Styled = styled.div`
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: 12px;
    width: 8px;
    height: 8px;
    border-top: 2px solid #333;
    border-right: 2px solid #333;
    transform: rotate(135deg);
    pointer-events: none;
  }
  select {
    height: 2.4em;
    width: 100%;
    padding: 0 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    cursor: pointer;
    &::-ms-expand {
      display: none;
    }
    &:focus {
      outline: 0;
      border: 1px solid rgb(33, 150, 243);
    }
  }
  .error{
    color: red;
    font-size: 12px;
    line-height: 28px;
    margin-top: 5px;
  }
`;

export const Select = forwardRef(SelectField);
