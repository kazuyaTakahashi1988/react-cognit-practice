import React, { forwardRef } from "react";
import styled from "styled-components";
import { PropsInputItems } from "../../lib/props";
import Input from "./Input";

type Props = React.InputHTMLAttributes<HTMLInputElement> & PropsInputItems;

export const InputItemsField: React.ForwardRefRenderFunction<
  HTMLInputElement,
  Props
> = (props, ref) => {
  const { label, type, placeholder, errors, ...rest } = props;

  return (
    <Styled>
      <Input
        type={type}
        label={label}
        placeholder={placeholder}
        ref={ref}
        {...rest}
        errors={errors}
      />
    </Styled>
  );
};

const Styled = styled.div``;

export const InputItems = forwardRef(InputItemsField);
export default InputItems;
