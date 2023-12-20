import React from "react";
import styled from "styled-components";
import { useForm, useFieldArray } from "react-hook-form";
import { PropsTodoExample } from "../../../lib/props";

import Layout from "../../../components/Layout/Layout";
import TodoItems from "../../../components/Form/TodoItems";
import CheckBox from "../../../components/Form/CheckBox";
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

        <Button
          className="mt-30"
          onClick={() => append({ check: false, task: "" })}
        >
          追加
        </Button>

        {fields.map((field, index) => (
          <div className="mt-30 todo-clm" key={field.id}>
            <CheckBox
              label={undefined}
              options={[{ value: "", label: "" }]}
              {...register(`todoItemsName.${index}.check` as const)}
            />
            <TodoItems
              placeholder="タスクを入力してください。"
              label={undefined}
              onRemove={() => remove(index)}
              {...register(`todoItemsName.${index}.task` as const)}
            />
          </div>
        ))}

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
    &.todo-clm {
      animation: fadeIn 0.4s ease forwards;
      display: flex;
      justify-content: center;
      align-items: center;
    }
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
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export default TodoExample;
