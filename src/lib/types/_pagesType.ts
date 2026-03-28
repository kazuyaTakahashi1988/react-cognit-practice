/* -------------------------------------------------------
    ▽ 型定義 (ページ編) ▽
---------------------------------------------------------- */
// FormExample
export type TypeFormExample = {
  inputName: string;
  checkBoxName: object;
  radioButtonName: string;
  switchButtonName: string;
  selectName: string;
  selectCustomName: string;
  textAreaName: string;
};

// TodoExample
export type TypeTodoExample = { [x: string]: { [x: string]: boolean | string }[] };
