/* -------------------------------------------------------
    ▽ 型定義 (ページ編) ▽
---------------------------------------------------------- */

// FormExample
export type TypeFormExampleValues = {
  inputName: string;
  checkBoxName: string[];
  radioButtonName: string;
  switchButtonName: string;
  selectName: string;
  selectCustomName: string;
  textAreaName: string;
};

// TodoExample
export type TypeTodoExampleValues = { [x: string]: { [x: string]: boolean | string }[] };
