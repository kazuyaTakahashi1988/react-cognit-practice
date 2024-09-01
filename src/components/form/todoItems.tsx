import React, { forwardRef } from "react";
import styled from "styled-components";
import { TypeTodoItems } from "../../lib/types";

import CheckBox from "./checkBox";
import Input from "./input";
import Button from "../button/button";

type Props = React.InputHTMLAttributes<HTMLInputElement> & TypeTodoItems;

export const TodoItemsField: React.ForwardRefRenderFunction<
  HTMLInputElement,
  Props
> = (props, ref) => {
  const { itemsName, onAppend, onRemove, fields, register, ...rest } = props;

  const name = rest.name;
  const { checkBoxName, inputName } = itemsName;

  return (
    <Styled className={rest.className} ref={ref}>
      {onAppend && <Button onClick={onAppend}>追加</Button>}

      <ul className="todo-list">
        {fields?.map((field, index) => (
          <li key={field.id}>
            <CheckBox
              options={[{ value: "", label: "" }]}
              {...register(`${name}.${index}.${checkBoxName}`)}
              className="checkbox"
            />
            <Input
              {...rest}
              {...register(`${name}.${index}.${inputName}`)}
              className="input"
            />
            {onRemove && <Button
              className="secondary"
              key={field.id}
              onClick={onRemove}
              disabled={fields?.length < 2}
            >
              削除
            </Button>}
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
      > .checkbox {
        margin-right: 20px;
        .label__text::before {
          margin: 0;
        }
      }
      > .input {
        width: 100%;
      }
      > .secondary {
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
