import React, { forwardRef } from "react";
import styled from "styled-components";
import { PropsTodoItems } from "../../lib/props";
import Input from "./Input";

type Props = React.InputHTMLAttributes<HTMLInputElement> & PropsTodoItems;

export const TodoItemsField: React.ForwardRefRenderFunction<
  HTMLInputElement,
  Props
> = (props, ref) => {
  const { label, onClick, errors, ...rest } = props;

  return (
    <Styled className={rest.className}>
      <div className="input-wrap">
        <Input
          label={label}
          ref={ref}
          {...rest}
          errors={errors}
          type={rest.type || "text"}
          className=""
        />
      </div>
      <small onClick={onClick}>削除</small>
    </Styled>
  );
};

const Styled = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  text-align: left;
  align-items: center;
  .input-wrap {
    width: calc(100% - 50px);
  }
  small {
    cursor: pointer;
  }
`;

export const TodoItems = forwardRef(TodoItemsField);
export default TodoItems;
