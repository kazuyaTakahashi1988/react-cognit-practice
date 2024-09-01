/* -------------------------------------------------------
    ▽ 型定義 (ビュー編) ▽
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
export type TypeTodoExample = {
  [x: string]: {
    [x: string]: boolean | string;
  }[];
};

// SignIn
export type TypeSignIn = {
  email: string;
  password: string;
};

// SignUp
export type TypeSignUp = {
  email: string;
  password: string;
};

// Verification
export type TypeVerification = {
  verificationCode: string;
  email: string;
};
