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
      {errorMessage && <p className='error'>{errorMessage}</p>}
    </Styled>
  )
};

const Styled = styled.div`
  textarea {
    display: block;
    width: 100%;
    height: 100%;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    resize: vertical;
    &:focus {
      outline: 0;
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

export const TextArea = forwardRef(TextAreaField);
