import React, { forwardRef } from 'react';
import styled from 'styled-components'
import { PropsRadioButton } from '../../lib/props';

type Props = React.InputHTMLAttributes<HTMLInputElement> & PropsRadioButton;

export const RadioButtonField: React.ForwardRefRenderFunction<
  HTMLInputElement,
  Props
> = (props, ref): any => {
  const { options, errorMessage, ...rest } = props;

  return (
    <Styled>
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
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

export const RadioButton = forwardRef(RadioButtonField);
