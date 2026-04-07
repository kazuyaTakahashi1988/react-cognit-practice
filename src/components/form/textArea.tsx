import { forwardRef } from "react";
import styled from "styled-components";

import { ErrorMessage } from "./errorMessage";
import { Label } from "./label";
import { color } from "../../lib/style";

import type { TypeTextArea } from "../../lib/types";
import type React from "react";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & TypeTextArea;

/* -----------------------------------------------
 * テキストエリア項目
 * ----------------------------------------------- */

export const TextAreaField: React.ForwardRefRenderFunction<HTMLTextAreaElement, Props> = (
  props,
  ref,
) => {
  const { label, errorMessage, ...rest } = props;

  return (
    <Styled className={rest.className}>
      <Label label={label} />

      <textarea {...rest} className="" ref={ref}></textarea>

      <ErrorMessage errorMessage={errorMessage} />
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
    box-shadow: 0 0 0 1px ${color.gray};
    &:focus {
      outline: 0;
      box-shadow: 0 0 0 1px ${color.primary};
    }
    &::placeholder {
      color: ${color.gray100};
    }
    &:disabled {
      cursor: not-allowed;
      background: ${color.gray};
      color: ${color.gray100};
    }
  }
`;

export const TextArea = forwardRef(TextAreaField);
export default TextArea;
