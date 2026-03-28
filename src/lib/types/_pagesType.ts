/* -------------------------------------------------------
    ▽ 型定義 (ページ編) ▽
---------------------------------------------------------- */
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
export type TypeTodoItem = {
  check: boolean;
  task: string;
};

export type TypeTodoExample = {
  todoItems: TypeTodoItem[];
};
