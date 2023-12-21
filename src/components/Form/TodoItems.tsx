import React, { forwardRef } from "react";
import styled from "styled-components";
import { PropsTodoItems } from "../../lib/props";

import Input from "./Input";
import CheckBox from "./CheckBox";
import Button from "../Button/Button";

type Props = React.InputHTMLAttributes<HTMLInputElement> & PropsTodoItems;

export const TodoItemsField: React.ForwardRefRenderFunction<
  HTMLInputElement,
  Props
> = (props, ref) => {
  const { append, remove, fields, register, ...rest } = props;

  return (
    <Styled className={rest.className} ref={ref}>
      <Button onClick={() => append()}>
        追加
      </Button>

      <ul className="todo-list">
        {fields.map((field: { id: React.Key | null | undefined; }, index: unknown) => (
          <li key={field.id}>
            <CheckBox
              options={[{ value: "", label: "" }]}
              {...register(`todoItemsName.${index}.check` as const)}
              className="todo-check"
            />
            <Input
              {...rest}
              {...register(`todoItemsName.${index}.task` as const)}
              className="todo-task"
            />
            <Button className="secondary" onClick={() => remove(index)}>
              削除
            </Button>
          </li>
        ))}
      </ul>
    </Styled>
  );
};

const Styled = styled.div`
  .todo-list {
    > li {
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      animation: fadeIn 0.4s ease forwards;
      .todo-check {
        margin-right: 20px;
        .label__text::before {
          margin: 0;
        }
      }
      .todo-task {
        width: 100%;
      }
      .secondary {
        width: 80px;
        margin-left: 20px;
      }
    }
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const TodoItems = forwardRef(TodoItemsField);
export default TodoItems;
