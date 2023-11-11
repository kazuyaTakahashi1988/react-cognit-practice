import React, { forwardRef } from 'react';
import styled from 'styled-components'
import { PropsTextArea } from '../../lib/props';

type Props = React.InputHTMLAttributes<HTMLTextAreaElement> & PropsTextArea;

export const TextAreaField: React.ForwardRefRenderFunction<
  HTMLTextAreaElement,
  Props
> = (props, ref): any => {
  const { placeholder, errorMessage, ...rest } = props;

  return (
    <Styled>
      <textarea
        ref={ref}
        {...rest}
        placeholder={placeholder}
      ></textarea>
      {errorMessage && <span>{errorMessage}</span>}
    </Styled>
  )
};

const Styled = styled.div`

`;

export const TextArea = forwardRef(TextAreaField);
