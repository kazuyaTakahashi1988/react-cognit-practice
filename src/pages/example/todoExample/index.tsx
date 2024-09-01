import React from "react";
import styled from "styled-components";
import { media, params } from "../../../lib/style";
import { useForm, useFieldArray } from "react-hook-form";
import { TypeTodoExample } from "../../../lib/types";

import Layout from "../../../components/layout/layout";
import TodoItems from "../../../components/form/todoItems";
import Button from "../../../components/button/button";

const TodoExample: React.FC = () => {
  const todoItemsName = "todoItems";
  const checkBoxName = "check";
  const inputName = "task";
  const todoItems = { [checkBoxName]: false, [inputName]: "" };

  const { register, handleSubmit, reset, control } = useForm<TypeTodoExample>({
    mode: "onSubmit",
    defaultValues: {
      [todoItemsName]: [todoItems],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: todoItemsName,
    control,
  });

  const onAppend = () => append(todoItems);
  const onRemove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const index = Number(e.currentTarget.getAttribute("key"));
    remove(index);
  }

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Layout type="example">
      <Styled>
        <h1>
          <span>TodoExample</span>
        </h1>

        <TodoItems
          className="mt-30"
          name={todoItemsName}
          itemsName={{ checkBoxName: checkBoxName, inputName: inputName }}
          placeholder="タスクを入力してください。"
          onAppend={onAppend}
          onRemove={(e) => onRemove(e)}
          fields={fields}
          register={register}
        />

        <div className="mt-30 button-clm">
          <Button className="secondary" onClick={() => reset()}>
            リセット
          </Button>
          <Button onClick={() => onSubmit()}>送信する</Button>
        </div>
      </Styled>
    </Layout>
  );
};

const Styled = styled.div`
  .mt-30 {
    margin-top: 30px;
    &.button-clm {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      > * {
        margin-right: 20px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  /* ---------------------------------------------- 
    lib/Style/_mixin 試し書き
  ---------------------------------------------- */
  color: ${params.black};
  ${media.pc} {
    /* @media (min-width: 769px){} の内容が記述できるよ */
  }
  ${media.sp} {
    /* @media (max-width: 768px){} の内容が記述できるよ */
  }
  ${media.tab} {
    /* @media (max-width: 1080px){} の内容が記述できるよ */
  }
`;

export default TodoExample;
