import React, { forwardRef } from "react";
import styled from "styled-components";
import { params } from "../../lib/style";
import { TypeTextArea } from "../../lib/types";

import { Label } from "./label";
import { ErrorMessage } from "./errorMessage";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & TypeTextArea;

export const TextAreaField: React.ForwardRefRenderFunction<
  HTMLTextAreaElement,
  Props
> = (props, ref) => {
  const { label, errorMessage, ...rest } = props;

  return (
    <Styled className={rest.className}>
      {label && <Label label={label} />}

      <textarea ref={ref} {...rest} className=""></textarea>

      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
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
