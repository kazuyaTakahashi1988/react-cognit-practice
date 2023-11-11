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
    </Styled>
  )
};

const Styled = styled.div`
  
`;

export const Select = forwardRef(SelectField);
