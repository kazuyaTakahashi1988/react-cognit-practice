import React, { forwardRef } from "react";
import styled from "styled-components";
import { params, PropsErrorMessage } from "../../lib/";

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
    font-size: 12px;
    line-height: 28px;
    display: block;
    color: ${params.red};
  }
`;

export const ErrorMessage = forwardRef(ErrorMessageField);
export default ErrorMessage;
