/* -------------------------------------------------------
    ▽ Props の型定義 (ビュー編) ▽
---------------------------------------------------------- */
// FormExample
export type PropsFormExample = {
  inputName: string;
  checkBoxName: object;
  radioButtonName: string;
  switchButtonName: string;
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
// Layout
export type PropsLayout = {
  type: string | undefined;
  children?: any;
};
// PropsHeader
export type PropsHeader = {
  type: string | undefined;
};

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

// SwitchButton
export type PropsSwitchButton = {
  type: string | undefined,
  label: {
    text: string | undefined,
    required: boolean
  } | undefined;
  options: Array<{
    value: string,
    label: string,
    labelActived: string | undefined,
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

// Button
export type PropsButton = {
  type: string | undefined,
  children?: any;
  onClick?: any;
  isDisable: boolean;
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
  initOpen: boolean;
};

// Accordion
export type PropsAccordion = {
  title: string | undefined;
  children?: any;
  initOpen: boolean;
};

// DropdownMenu
export type PropsDropdownMenu = {
  menuList: Array<{
    text: string | undefined,
    onClick?: any,
  }>;
  children?: any;
};
