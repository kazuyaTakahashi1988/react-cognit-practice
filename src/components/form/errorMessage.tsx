import { forwardRef } from "react";
import styled from "styled-components";

import { color } from "../../lib/style";

import type { TypeErrorMessage } from "../../lib/types";
import type React from "react";

type Props = React.LabelHTMLAttributes<HTMLLabelElement> & TypeErrorMessage;

/* -----------------------------------------------
 * エラーメッセージ
 * ----------------------------------------------- */

export const ErrorMessageField: React.ForwardRefRenderFunction<HTMLLabelElement, Props> = (
  props,
  ref,
) => {
  const { errorMessage, ...rest } = props;

  if (!errorMessage) {
    return null;
  }

  return (
    <Styled className={rest.className}>
      <label {...rest} className="error" ref={ref}>
        {errorMessage}
      </label>
    </Styled>
  );
};

const Styled = styled.div`
  .error {
    font-size: 12px;
    line-height: 28px;
    display: block;
    color: ${color.red};
  }
`;

export const ErrorMessage = forwardRef(ErrorMessageField);
export default ErrorMessage;
