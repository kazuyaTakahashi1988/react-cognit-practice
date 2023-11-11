/* -------------------------------------------------------
    ▽ Props の型定義 (ビュー編) ▽
---------------------------------------------------------- */
// FormExample
export type PropsFormExample = {
  inputValue: string;
  checkBoxValue: Array<[]>;
  radioButtonValue: string;
  selectValue: string;
  textAreaValue: string;
};

// PropsSignIn
export type PropsSignIn = {
  email: string;
  password: string;
};

// PropsSignUp
export type PropsSignUp = {
  email: string;
  password: string;
};

// PropsVerification
export type PropsVerification = {
  verificationCode: string;
  email: string;
};

/* -------------------------------------------------------
    ▽ Props の型定義 (コンポーネント編) ▽
---------------------------------------------------------- */

// Button
export type PropsButton = {
  children?: object;
};

// Input
export type PropsInput = {
  type: string;
  placeholder: string;
  errorMessage?: string;
};

// CheckBox
export type PropsCheckBox = {
  options: Array<{
    value: string,
    label: string,
  }>;
  errorMessage?: string;
};

// RadioButton
export type PropsRadioButton = {
  options: Array<{
    value: string,
    label: string,
  }>;
  errorMessage?: string;
};

// Select
export type PropsSelect = {
  options: Array<{
    value: string,
    label: string,
  }>;
  placeholder: string;
  errorMessage?: string;
};

// TextArea
export type PropsTextArea = {
  placeholder: string;
  errorMessage: any;
};