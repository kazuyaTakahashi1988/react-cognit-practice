import React, { forwardRef } from "react";
import styled from "styled-components";
import { PropsLabel } from "../../lib/props";

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
      color: red;
      transform: translateY(-3px);
      display: inline-block;
    }
  }
`;

export const Label = forwardRef(LabelField);
export default Label;
