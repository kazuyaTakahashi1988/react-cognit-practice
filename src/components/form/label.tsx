import { forwardRef } from "react";
import styled from "styled-components";

import { params } from "../../lib/style";

import type { TypeLabel } from "../../lib/types";
import type React from "react";

type Props = React.LabelHTMLAttributes<HTMLLabelElement> & TypeLabel;

/* -----------------------------------------------
 * ラベル
 * ----------------------------------------------- */

export const LabelField: React.ForwardRefRenderFunction<HTMLLabelElement, Props> = (props, ref) => {
  const { label, ...rest } = props;
  if (!label) {
    return null;
  }

  return (
    <Styled className={rest.className}>
      <label {...rest} className="label-text" ref={ref}>
        {label.text}
        {label.required && <span>*</span>}
      </label>
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
