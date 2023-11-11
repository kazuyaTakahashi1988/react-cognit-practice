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
        <div key={index}>
          <input
            type="checkbox"
            id={option.value}
            value={option.value}
            ref={ref}
            {...rest}
          />
          <label htmlFor={option.value}>{option.label}</label>
        </div>
      ))}
      {errorMessage && <span>{errorMessage}</span>}
    </Styled>
  )
};

const Styled = styled.div`
  
`;

export const CheckBox = forwardRef(CheckBoxField);
