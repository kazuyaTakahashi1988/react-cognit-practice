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

// TodoExample
export type PropsTodoExample = {
  todoItemsName: {
    check: boolean;
    task: string;
  }[];
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
