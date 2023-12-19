import React, { forwardRef } from "react";
import styled from "styled-components";
import { PropsErrorMessage } from "../../lib/props";

type Props = React.LabelHTMLAttributes<HTMLLabelElement> & PropsErrorMessage;

export const ErrorMessageField: React.ForwardRefRenderFunction<
  HTMLLabelElement,
  Props
> = (props, ref) => {
  const { errorMessage, ...rest } = props;

  return (
    <Styled className={rest.className}>
      {errorMessage && (
        <label ref={ref} {...rest} className="error">
          {errorMessage}
        </label>
      )}
    </Styled>
  );
};

const Styled = styled.div`
  .error {
    color: red;
    font-size: 12px;
    line-height: 28px;
    display: block;
  }
`;

export const ErrorMessage = forwardRef(ErrorMessageField);
export default ErrorMessage;
