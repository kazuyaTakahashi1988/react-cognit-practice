import React from "react";
import styled from "styled-components";
import { useForm, useFieldArray } from "react-hook-form";
import { PropsTodoExample } from "../../../lib/props";

import Layout from "../../../components/Layout/Layout";
import TodoItems from "../../../components/Form/TodoItems";
import SwitchButton from "../../../components/Form/SwitchButton";
import Button from "../../../components/Button/Button";

const TodoExample: React.FC = () => {
  const { register, handleSubmit, reset, control } = useForm<PropsTodoExample>({
    mode: "onSubmit",
    defaultValues: {
      todoItemsName: [{ task: "test", flag: "" }],
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
          <span>
            TodoExample
            <br />
            <small>：react-hook-form</small>
          </span>
        </h1>

        <Button
          className="clm button-clm left"
          onClick={() => append({ task: "", flag: "" })}
        >
          追加
        </Button>

        {fields.map((field, index) => (
          <div className="clm todo-clm" key={field.id}>
            <TodoItems
              placeholder="Todo タスク"
              label={undefined}
              onClick={() => remove(index)}
              {...register(`todoItemsName.${index}.task` as const)}
            />
            <SwitchButton
              label={undefined}
              options={[
                { value: "complate", label: "未対応", labelActived: "対応済" },
              ]}
              {...register(`todoItemsName.${index}.flag` as const)}
            />
          </div>
        ))}

        <div className="clm button-clm">
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
  .clm {
    margin-top: 30px;
    &.todo-clm {
      animation: fadeIn 0.6s ease forwards;
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
      &.left {
        justify-content: left;
      }
    }
    .todo-items {
      margin-bottom: 10px;
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
