import { forwardRef } from "react";
import styled from "styled-components";

import { ErrorMessage } from "./errorMessage";
import { Label } from "./label";
import { color } from "../../lib/style";

import type { TypeSelect } from "../../lib/types";
import type React from "react";

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & TypeSelect;

/* -----------------------------------------------
 * セレクトボックス項目
 * ----------------------------------------------- */

export const SelectField: React.ForwardRefRenderFunction<HTMLSelectElement, Props> = (
  props,
  ref,
) => {
  const { label, options, errorMessage, ...rest } = props;

  return (
    <Styled className={rest.className}>
      <Label label={label} />

      <div className="select">
        <select {...rest} className="" ref={ref}>
          {rest.placeholder && (
            <option hidden value="">
              {rest.placeholder}
            </option>
          )}
          {options.map((option, index) => (
            <option disabled={option.disabled} key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <ErrorMessage errorMessage={errorMessage} />
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
      border-top: 2px solid ${color.gray50};
      border-right: 2px solid ${color.gray50};
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
      color: ${color.black};
      box-shadow: 0 0 0 1px ${color.gray};
      &::-ms-expand {
        display: none;
      }
      &:focus {
        outline: 0;
        box-shadow: 0 0 0 1px ${color.primary};
      }
      &:disabled {
        cursor: not-allowed;
        background: ${color.gray};
        color: ${color.gray100};
      }
    }
  }
`;

export const Select = forwardRef(SelectField);
export default Select;
