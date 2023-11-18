/* -------------------------------------------------------
    ▽ Props の型定義 (ビュー編) ▽
---------------------------------------------------------- */
// FormExample
export type PropsFormExample = {
  inputName: string;
  checkBoxName: object;
  radioButtonName: string;
  selectName: string;
  selectCustomName: string;
  textAreaName: string;
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

// Label
export type PropsLabel = {
  label: {
    text: string | undefined,
    required: boolean
  } | undefined;
};

// ErrorMessage
export type PropsErrorMessage = {
  errorMessage: string | undefined;
};

// Input
export type PropsInput = {
  label: {
    text: string | undefined,
    required: boolean
  } | undefined;
  type: string | undefined;
  placeholder: string | undefined;
  errors?: object | undefined;
};

// CheckBox
export type PropsCheckBox = {
  label: {
    text: string | undefined,
    required: boolean
  } | undefined;
  options: Array<{
    value: string,
    label: string,
  }>;
  errors?: object | undefined;
};

// RadioButton
export type PropsRadioButton = {
  label: {
    text: string | undefined,
    required: boolean
  } | undefined;
  options: Array<{
    value: string,
    label: string,
  }>;
  errors?: object | undefined;
};

// Select
export type PropsSelect = {
  label: {
    text: string | undefined,
    required: boolean
  } | undefined;
  options: Array<{
    value: string,
    label: string,
  }>;
  placeholder: string | undefined;
  errors?: object | undefined;
};

// SelectCustom
export type PropsSelectCustom = {
  label: {
    text: string | undefined,
    required: boolean
  } | undefined;
  options: Array<{
    value: string,
    label: string,
  }>;
  placeholder: string | undefined;
  errors?: object | undefined;
};

// TextArea
export type PropsTextArea = {
  label: {
    text: string | undefined,
    required: boolean
  } | undefined;
  placeholder: string | undefined;
  errors?: object | undefined;
};

// Modal
export type PropsModal = {
  text: string | undefined;
  title: string | undefined;
  button: {
    text: string | undefined,
    onClick?: any,
  } | undefined;
  children?: any;
};

// Button
export type PropsButton = {
  type: string | undefined,
  children?: any;
  onClick?: any;
  isDisable: boolean;
};