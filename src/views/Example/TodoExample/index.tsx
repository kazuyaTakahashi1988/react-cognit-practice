import React from "react";
import styled from "styled-components";
import { useForm, useFieldArray } from "react-hook-form";
import { PropsTodoExample } from "../../../lib/props";

import Layout from "../../../components/Layout/Layout";
import TodoItems from "../../../components/Form/TodoItems";
import SwitchButton from "../../../components/Form/SwitchButton";
import Button from "../../../components/Button/Button";

const TodoExample: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    // formState: { errors },
  } = useForm<PropsTodoExample>({
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

        <div className="clm button-clm left">
          <Button
            type={undefined}
            onClick={() => append({ task: "", flag: "" })}
            isDisable={false}>
            追加
          </Button>
        </div>

        {fields.map((field, index) =>
          <div className="clm todo-clm" key={field.id}>
            <TodoItems
              type={undefined}
              label={undefined}
              onClick={() => remove(index)}
              placeholder="Todo タスク"
              {...register(`todoItemsName.${index}.task` as const)}
              errors={undefined}
            />
            <SwitchButton
              type={undefined}
              label={undefined}
              options={[{ value: "complate", label: "未完", labelActived: "完了" }]}
              {...register(`todoItemsName.${index}.flag` as const)}
              errors={undefined}
            />
          </div>
        )}

        <div className="clm button-clm">
          <Button type="secondary" onClick={() => reset()} isDisable={false}>
            リセット
          </Button>
          <Button type={undefined} onClick={() => onSubmit()} isDisable={false}>
            送信する
          </Button>
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
