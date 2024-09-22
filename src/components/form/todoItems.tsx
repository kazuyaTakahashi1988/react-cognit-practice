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
  const { itemsName, onAppend, onRemove, fields, register, errors, ...rest } = props;

  const name = rest.name;
  const { checkBoxName, inputName } = itemsName;

  const getErrorMessage = (index: number, itemName: string) => {
    return Array.isArray(errors) && errors?.[index]?.[itemName]?.message
  }

  return (
    <Styled className={rest.className} ref={ref}>
      {onAppend && <Button onClick={onAppend}>追加</Button>}

      <ul className="todo-list">
        {fields?.map((field, index) => (
          <li key={field.id}>
            <CheckBox
              options={[{ value: "", label: "" }]}
              {...register(`${name}.${index}.${checkBoxName}`, {
                // required: { value: true, message: "必須項目だよ。" },
              })}
              // errorMessage={getErrorMessage(index, checkBoxName)}
              className="checkbox"
            />

            <Input
              {...rest}
              {...register(`${name}.${index}.${inputName}`, {
                required: { value: true, message: "必須項目だよ。" },
                // minLength: { value: 2, message: `2文字以上にしてね` },
                // maxLength: { value: 50, message: "最大50文字だよ" },
              })}
              errorMessage={getErrorMessage(index, inputName)}
              className="input"
            />

            {onRemove && <Button
              className="secondary"
              data-index={index}
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
      animation: fadeIn 0.4s ease forwards;
      > .checkbox {
        margin: 10px 20px 0 0;
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
