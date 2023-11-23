import React, { forwardRef } from 'react';
import styled from 'styled-components'
import { PropsSelect } from '../../lib/props';
import { Label } from './Label';
import { ErrorMessage } from './ErrorMessage';

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & PropsSelect;

export const SelectField: React.ForwardRefRenderFunction<
  HTMLSelectElement,
  Props
> = (props, ref): any => {
  const { label, options, placeholder, errors, ...rest } = props;
  
  return (
    <Styled>
      {label && <Label label={label} />}

      <div className='select'>
        <select ref={ref} {...rest}>
          {placeholder && <option value='' hidden>{ placeholder }</option>}
          {options.map((option, index) => (
            <option
              value={option.value}
              key={index}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {errors && Object.values(errors).map((error, index) => {
        return error.ref.name === rest.name && <ErrorMessage key={index} errorMessage={error.message} />
      })}
    </Styled>
  )
};

const Styled = styled.div`
  .select{
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
    > select {
      height: 2.4em;
      line-height: 2.4em;
      width: 100%;
      padding: 0 8px;
      border-radius: 4px;
      border: none;
      box-shadow: 0 0 0 1px #ccc;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      color: #000;
      cursor: pointer;
      &::-ms-expand {
        display: none;
      }
      &:focus {
        outline: 0;
        box-shadow: 0 0 0 1px rgb(33, 150, 243);
      }
    }
  }
`;

export const Select = forwardRef(SelectField);
export default Select;