/* -------------------------------------------------------
    ▽ Props の型定義 (ビュー編) ▽
---------------------------------------------------------- */
// サインアップ
export type PropsSignIn = {
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