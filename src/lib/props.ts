/* -------------------------------------------------------
    ▽ Props の型定義 (ビュー編) ▽
---------------------------------------------------------- */


/* -------------------------------------------------------
    ▽ Props の型定義 (コンポーネント編) ▽
---------------------------------------------------------- */

// Input
export type PropsInput = {
  register: any;
  type: string;
  name: string;
  errors: any;
};

// Select
export type PropsSelect = {
  options: Array<{
    value: string,
    label: string,
  }>,
  register: any;
  name: string;
  placeholder: string;
  errors: any;
};

// TextArea
export type PropsTextArea = {
  register: any;
  name: string;
  errors: any;
};

// CheckBox
export type PropsCheckBox = {
  options: Array<{
    value: string,
    label: string,
  }>,
  register: any;
  name: string;
  errors: any;
};

// RadioButton
export type PropsRadioButton = {
  options: Array<{
    value: string,
    label: string,
  }>,
  register: any;
  name: string;
  errors: any;
};