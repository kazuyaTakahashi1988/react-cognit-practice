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
      {errorMessage && <p className='error'>{errorMessage}</p>}
    </Styled>
  )
};

const Styled = styled.div`
  input {
    height: 2.4em;
    width: 100%;
    padding: 0 16px;
    border-radius: 4px;
    border: 1px solid #ccc;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    &:focus {
      border: 1px solid rgb(33, 150, 243);
    }
    &::placeholder { color: #666; }
  }
  .error{
    color: red;
    font-size: 12px;
    line-height: 28px;
    margin-top: 5px;
  }
`;

export const Input = forwardRef(InputField);
