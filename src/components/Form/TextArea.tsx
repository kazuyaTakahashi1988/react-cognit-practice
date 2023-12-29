import React, { forwardRef } from "react";
import styled from "styled-components";
import { params, PropsTextArea } from "../../lib/";

import { Label } from "./Label";
import { ErrorMessage } from "./ErrorMessage";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & PropsTextArea;

export const TextAreaField: React.ForwardRefRenderFunction<
  HTMLTextAreaElement,
  Props
> = (props, ref) => {
  const { label, errors, ...rest } = props;

  return (
    <Styled className={rest.className}>
      {label && <Label label={label} />}

      <textarea ref={ref} {...rest} className=""></textarea>

      {errors &&
        Object.values(errors).map((error, index) => {
          return (
            error.ref.name === rest.name && (
              <ErrorMessage key={index} errorMessage={error.message} />
            )
          );
        })}
    </Styled>
  );
};

const Styled = styled.div`
  textarea {
    display: block;
    width: 100%;
    height: 100%;
    padding: 10px;
    border-radius: 4px;
    border: none;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    resize: vertical;
    box-shadow: 0 0 0 1px ${params.gray};
    &:focus {
      outline: 0;
      box-shadow: 0 0 0 1px ${params.primary};
    }
    &::placeholder {
      color: ${params.gray100};
    }
  }
`;

export const TextArea = forwardRef(TextAreaField);
export default TextArea;
