import React, { forwardRef } from "react";
import styled from "styled-components";
import { params } from "../../lib/Style";
import { PropsLabel } from "../../lib/Props";

type Props = React.LabelHTMLAttributes<HTMLLabelElement> & PropsLabel;

export const LabelField: React.ForwardRefRenderFunction<
  HTMLLabelElement,
  Props
> = (props, ref) => {
  const { label, ...rest } = props;

  return (
    <Styled className={rest.className}>
      {label && (
        <label ref={ref} {...rest} className="label-text">
          {label.text}
          {label.required && <span>*</span>}
        </label>
      )}
    </Styled>
  );
};

const Styled = styled.div`
  .label-text {
    display: block;
    font-size: 14px;
    font-weight: 500;
    line-height: 28px;
    margin-bottom: 10px;
    > span {
      transform: translateY(-3px);
      display: inline-block;
      color: ${params.red};
    }
  }
`;

export const Label = forwardRef(LabelField);
export default Label;
