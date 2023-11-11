import React, { forwardRef } from 'react';
import styled from 'styled-components'
import { PropsInput } from '../../lib/props';

type Props = React.InputHTMLAttributes<HTMLInputElement> & PropsInput;

export const InputField: React.ForwardRefRenderFunction<
  HTMLInputElement,
  Props
> = (props, ref): any => {
  const { type, placeholder, errorMessage, ...rest } = props;
  return (
    <Styled>
      <input
        type={type || 'text'}
        ref={ref}
        {...rest}
        placeholder={placeholder}
      />
      {errorMessage && <span>{errorMessage}</span>}
    </Styled>
  )
};

const Styled = styled.div`
  
`;

export const Input = forwardRef(InputField);
