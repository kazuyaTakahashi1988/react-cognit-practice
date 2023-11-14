import React, { forwardRef } from 'react';
import styled from 'styled-components'
import { PropsTextArea } from '../../lib/props';
import { Label } from './Label';
import { ErrorMessage } from './ErrorMessage';

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & PropsTextArea;

export const TextAreaField: React.ForwardRefRenderFunction<
  HTMLTextAreaElement,
  Props
> = (props, ref): any => {
  const { label, placeholder, errors, ...rest } = props;

  return (
    <Styled>
      {label && <Label label={label} />}

      <textarea
        placeholder={placeholder}
        ref={ref}
        {...rest}
      ></textarea>

      {errors && Object.values(errors).map(error => {
        return error.ref.name === rest.name && <ErrorMessage errorMessage={error.message} />
      })}
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
`;

export const TextArea = forwardRef(TextAreaField);
export default TextArea;