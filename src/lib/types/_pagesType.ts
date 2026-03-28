/* -------------------------------------------------------
    ▽ 型定義 (ページ編) ▽
---------------------------------------------------------- */

import type { TypeTodoItem } from "./_componentsType";

// FormExample
export type TypeFormExample = {
  inputName: string;
  checkBoxName: string[];
  radioButtonName: string;
  switchButtonName: string;
  selectName: string;
  selectCustomName: string;
  textAreaName: string;
};

// TodoExample
export type TypeTodoExample = { todoItems: TypeTodoItem[] };
