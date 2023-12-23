import React from "react";
import styled from "styled-components";
import { useForm, useFieldArray } from "react-hook-form";
import { PropsTodoExample } from "../../../lib/props";

import Layout from "../../../components/Layout/Layout";
import TodoItems from "../../../components/Form/TodoItems";
import Button from "../../../components/Button/Button";

const TodoExample: React.FC = () => {
  const { register, handleSubmit, reset, control } = useForm<PropsTodoExample>({
    mode: "onSubmit",
    defaultValues: {
      todoItemsName: [{ check: false, task: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "todoItemsName",
    control,
  });

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
          name="todoItemsName"
          itemsName={{ CheckBox: "check", Input: "task" }}
          placeholder="タスクを入力してください。"
          append={append}
          remove={remove}
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
`;

export default TodoExample;
