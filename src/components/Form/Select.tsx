import React, { forwardRef } from 'react';
import { PropsSelect } from '../../lib/props';

type Props = React.InputHTMLAttributes<HTMLSelectElement> & PropsSelect;

export const SelectField: React.ForwardRefRenderFunction<
  HTMLSelectElement,
  Props
> = (props, ref): any => {
  const { options, placeholder, errorMessage, ...rest } = props;

  return (
    <>
      <select
        ref={ref}
        {...rest}
      >
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
      {errorMessage && <span>{errorMessage}</span>}
    </>
  )
};

export const Select = forwardRef(SelectField);
