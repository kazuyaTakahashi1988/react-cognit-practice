import React from "react";
import styled from "styled-components";
import { PropsLabel } from "../../lib/props";

export const Label: React.FC<PropsLabel> = (props) => {
  const { label } = props;

  return (
    <Styled>
      {label && (
        <label className="label-text">
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

export default Label;
