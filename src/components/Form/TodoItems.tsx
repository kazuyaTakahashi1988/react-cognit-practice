import React, { forwardRef } from "react";
import styled from "styled-components";
import { PropsTodoItems } from "../../lib/props";

import CheckBox from "./CheckBox";
import Input from "./Input";
import Button from "../Button/Button";

type Props = React.InputHTMLAttributes<HTMLInputElement> & PropsTodoItems;

export const TodoItemsField: React.ForwardRefRenderFunction<
  HTMLInputElement,
  Props
> = (props, ref) => {
  const { itemsName, append, remove, fields, register, ...rest } = props;

  const name = rest.name;
  const checkBoxName = itemsName.CheckBox;
  const inputName = itemsName.Input;
  const appendFormat = { [`${checkBoxName}`]: false, [`${inputName}`]: "" };

  return (
    <Styled className={rest.className} ref={ref}>
      <Button onClick={() => append(appendFormat)}>追加</Button>

      <ul className="todo-list">
        {fields?.map((field, index) => (
          <li key={field.id}>
            <CheckBox
              options={[{ value: "", label: "" }]}
              {...register(`${name}.${index}.${checkBoxName}` as const)}
              className="checkbox"
            />
            <Input
              {...rest}
              {...register(`${name}.${index}.${inputName}` as const)}
              className="input"
            />
            <Button
              className="secondary"
              onClick={() => remove(index)}
              disabled={fields?.length < 2}
            >
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
