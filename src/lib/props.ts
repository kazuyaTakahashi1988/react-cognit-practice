/* -------------------------------------------------------
    ▽ Props の型定義 (ビュー編) ▽
---------------------------------------------------------- */
// サインアップ
export type PropsSignIn = {
  selectId: Number,
  content: string;
  checked: string[],
  email: string;
  password: string;
};

// サインイン
export type PropsSignUp = {
  email: string;
  password: string;
};

// アクティベート
export type PropsVerify = {
  verificationCode: string;
  email: string;
};

/* -------------------------------------------------------
    ▽ Props の型定義 (コンポーネント編) ▽
---------------------------------------------------------- */
// Input
export type PropsInput = {
  type: string;
  placeholder: string;
  disabled: boolean;
};

// Select
export type PropsSelect = {
  options: Array<{
    value: number,
    label: string,
  }>,
  placeholder: string;
  disabled: boolean;
};

// TextArea
export type PropsTextArea = {
  placeholder: string;
  disabled: boolean;
};

// CheckBox
export type PropsCheckBox = {
  options: Array<{
    id: string,
    label: string,
    checked: boolean,
    disabled: boolean,
  }>,
};

// RadioButton
export type PropsRadioButton = {
  type: string;
  placeholder: string;
  disabled: boolean;
};