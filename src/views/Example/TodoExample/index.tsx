import React from "react";
import styled from "styled-components";
import { useForm, useFieldArray, useWatch, Control } from "react-hook-form";
import { PropsTodoExample } from "../../../lib/props";

import Layout from "../../../components/Layout/Layout";
// import InputItems from "../../../components/Form/InputItems";
import Button from "../../../components/Button/Button";

const Total = ({ control }: { control: Control<PropsTodoExample> }) => {
  const formValues = useWatch({
    name: "inputItemsName",
    control,
  });
  const total = formValues.reduce(
    (acc, current) => acc + (current.price || 0) * (current.quantity || 0),
    0,
  );
  return <p>合計: {total}</p>;
};

const TodoExample: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<PropsTodoExample>({
    mode: "onSubmit", // 'onChange' or 'onBlur' or 'onSubmit' or 'onTouched' or 'all'
    reValidateMode: "onChange", // 'onChange' or 'onBlur' or 'onSubmit'
    criteriaMode: "all", // 'firstError' or 'all'
    defaultValues: {
      inputItemsName: [{ name: "test", quantity: 1, price: 23 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "inputItemsName",
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

        <div className="clm button-clm">
          <Total control={control} />
          <Button
            type="secondary"
            onClick={() =>
              append({
                name: "",
                quantity: 0,
                price: 0,
              })
            }
            isDisable={false}
          >
            追加
          </Button>
        </div>

        <div className="clm">
          {fields.map((field, index) => {
            return (
              <div key={field.id}>
                <section className={"section"} key={field.id}>
                  <input
                    placeholder="name"
                    {...register(`inputItemsName.${index}.name` as const, {
                      required: true,
                    })}
                    className={
                      errors?.inputItemsName?.[index]?.name ? "error" : ""
                    }
                  />
                  <input
                    placeholder="quantity"
                    type="number"
                    {...register(`inputItemsName.${index}.quantity` as const, {
                      valueAsNumber: true,
                      required: true,
                    })}
                    className={
                      errors?.inputItemsName?.[index]?.quantity ? "error" : ""
                    }
                  />
                  <input
                    placeholder="value"
                    type="number"
                    {...register(`inputItemsName.${index}.price` as const, {
                      valueAsNumber: true,
                      required: true,
                    })}
                    className={
                      errors?.inputItemsName?.[index]?.price ? "error" : ""
                    }
                  />
                  <small onClick={() => remove(index)}>削除</small>
                </section>
              </div>
            );
          })}
        </div>

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

// import { useForm } from "react-hook-form";
// import { PropsTodoExample } from "../../../lib/props";

// import Layout from "../../../components/Layout/Layout";
// import InputItems from "../../../components/Form/InputItems";
// import Button from "../../../components/Button/Button";
