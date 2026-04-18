import { useFieldArray, useForm } from "react-hook-form";
import styled from "styled-components";

import Button from "../../../components/button/button";
import TodoItems from "../../../components/form/todoItems";
import Layout from "../../../components/layouts/layout";
import { color, media } from "../../../lib/style";

import type { TypeTodoExampleValues } from "./type";
import type React from "react";

/* -----------------------------------------------
 * TodoExample ページ
 * ----------------------------------------------- */

// ページメタ情報
export const pageMeta = {
  title: "Todo Example",
  description: "動的に項目追加できる TODO フォームのサンプルページです。",
  sharePath: "/example/todo_example",
};

const TodoExample: React.FC = () => {
  /*
   * RHForm 使用設定
   */
  const todoForm = useForm<TypeTodoExampleValues>({
    mode: "onSubmit",
    defaultValues: { todoItems: [{ check: false, task: "" }] },
  });

  /*
   * TODO項目 使用設定
   */
  const { fields, append, remove } = useFieldArray({
    name: "todoItems",
    control: todoForm.control,
  });

  // 「追加」ボタン 処理
  const onAppend = () => append({ check: false, task: "" });

  // 「削除」ボタン 処理
  const onRemove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const index = Number(e.currentTarget.getAttribute("data-index"));
    remove(index);
  };

  /*
   * 「送信する」ボタン 処理
   */
  const onSubmit = todoForm.handleSubmit((data) => {
    console.warn(data);
  });

  return (
    <Layout pageMeta={pageMeta} type="example">
      <Styled>
        <h1>
          <span>TodoExample</span>
        </h1>

        {/* TODO項目 */}
        <TodoItems
          className="mt-30"
          errors={todoForm.formState.errors.todoItems}
          fields={fields}
          itemsName={{ checkBoxName: "check", inputName: "task" }}
          name="todoItems"
          onAppend={onAppend}
          onRemove={(e) => onRemove(e)}
          placeholder="タスクを入力してください。"
          register={todoForm.register}
        />

        {/* ボタン */}
        <div className="mt-30 button-clm">
          <Button className="secondary" onClick={() => todoForm.reset()}>
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
    "lib/style/_variable" 試し書き
  ---------------------------------------------- */
  color: ${color.black};

  // @media (min-width: 769px){ ・・・ } の内容が記述できるよ
  ${media.pc} {
  }

  // @media (max-width: 1080px){ ・・・ } の内容が記述できるよ
  ${media.tab} {
  }

  // @media (max-width: 768px){ ・・・ } の内容が記述できるよ
  ${media.sp} {
  }
`;

export default TodoExample;
