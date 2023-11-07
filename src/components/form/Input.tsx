import React, { forwardRef } from 'react';
import { PropsInput } from '../../lib/props';

type Props = React.InputHTMLAttributes<HTMLInputElement> & PropsInput;

export const InputField: React.ForwardRefRenderFunction<
  HTMLInputElement,
  Props
> = (props, ref): any => {
  const { type, placeholder, errorMessage, ...rest } = props;

  return (
    <>
      <input
        type={type || 'text'}
        ref={ref}
        {...rest}
        placeholder={placeholder}
      />
      {errorMessage && <span>{errorMessage}</span>}
    </>
  )
}

export const Input = forwardRef(InputField);
