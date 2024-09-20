import React, { forwardRef } from "react";
import styled from "styled-components";
import { params } from "../../lib/style";
import { TypeSelect } from "../../lib/types";

import { Label } from "./label";
import { ErrorMessage } from "./errorMessage";

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & TypeSelect;

export const SelectField: React.ForwardRefRenderFunction<
  HTMLSelectElement,
  Props
> = (props, ref) => {
  const { label, options, errorMessage, ...rest } = props;

  return (
    <Styled className={rest.className}>
      {label && <Label label={label} />}

      <div className="select">
        <select ref={ref} {...rest} className="">
          {rest.placeholder && (
            <option value="" hidden>
              {rest.placeholder}
            </option>
          )}
          {options.map((option, index) => (
            <option value={option.value} key={index}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
    </Styled>
  );
};

const Styled = styled.div`
  .select {
    position: relative;
    &:before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
      right: 12px;
      width: 8px;
      height: 8px;
      transform: rotate(135deg);
      pointer-events: none;
      border-top: 2px solid ${params.gray50};
      border-right: 2px solid ${params.gray50};
    }
    > select {
      height: 2.4em;
      line-height: 2.4em;
      width: 100%;
      padding: 0 8px;
      border-radius: 4px;
      border: none;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      cursor: pointer;
      color: ${params.black};
      box-shadow: 0 0 0 1px ${params.gray};
      &::-ms-expand {
        display: none;
      }
      &:focus {
        outline: 0;
        box-shadow: 0 0 0 1px ${params.primary};
      }
    }
  }
`;

export const Select = forwardRef(SelectField);
export default Select;
