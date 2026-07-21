import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import Button from "../../../components/button/button";
import ErrorMessage from "../../../components/form/errorMessage";
import Input from "../../../components/form/input";
import Layout from "../../../components/layouts/layout";
import { signInHelper, useAuth } from "../../../utils/authHelper";
import {
  loadingFlagDown,
  loadingFlagUp,
  store,
} from "../../../utils/storeHelper";

import type { TypeSignInResult, TypeSignInValues } from "../../../lib/types";
import type React from "react";

/* -----------------------------------------------
 * SignIn ページ
 * ----------------------------------------------- */

// メタ情報
export const pageMeta = {
  title: "Sign In",
  description: "メールアドレスとパスワードでログインするページです。",
  sharePath: "/auth/signin",
  // ogImage: "/xxxx/xxxx.jpg",
  // ogType: "website" or "article",
  // noindex: boolean,
};

const SignIn: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { refreshAuthState } = useAuth();

  /*
   * RHForm 使用設定
   */
  const signInForm = useForm<TypeSignInValues>({
    defaultValues: { email: "", password: "" },
  });

  /*
   * 「リセット」ボタン 処理
   */
  const onReset = () => {
    signInForm.reset();
    setErrorMessage("");
  };

  /*
   * 「送信する」ボタン 処理
   */
  const onSubmit = signInForm.handleSubmit((data) => {
    store.dispatch(loadingFlagUp()); // ローディングフラグを上げる

    /* Sign In 処理 */
    signInHelper(data)
      .then((res: TypeSignInResult) => {
        if (res.isSignedIn) {
          refreshAuthState(); // 認証状態を更新する処理
        } else {
          onReset();
          setErrorMessage("Sign In にはまだ追加手順（Verify）が必要だよ！");
        }
      })
      .catch((err: unknown) => {
        const message =
          err instanceof Error ? err.message : "Sign In に失敗したよ...";
        setErrorMessage(message);
      })
      .finally(() => {
        store.dispatch(loadingFlagDown()); // ローディングフラグを下げる
      });
  });

  return (
    <Layout pageMeta={pageMeta} type="auth">
      <Styled>
        <h1>SignIn</h1>

        {/* エラーメッセージ */}
        <ErrorMessage className="mt-30" errorMessage={errorMessage} />

        {/* インプット項目 - E-mail */}
        <Input
          className="mt-30"
          errorMessage={signInForm.formState.errors.email?.message}
          label={{ text: "emailを入力してください", required: true }}
          placeholder="○○○○＠○○○○.com"
          type="email"
          {...signInForm.register("email", { required: "必須項目だよ。" })}
        />

        {/* インプット項目 - Password */}
        <Input
          className="mt-30"
          errorMessage={signInForm.formState.errors.password?.message}
          label={{ text: "passwordを入力してください", required: true }}
          placeholder="○○○○○○○○"
          type="password"
          {...signInForm.register("password", { required: "必須項目だよ。" })}
        />

        {/* ボタン */}
        <div className="mt-30 button-clm">
          <Button className="secondary" onClick={() => onReset()}>
            リセット
          </Button>
          <Button onClick={() => onSubmit()}>送信する</Button>
        </div>
      </Styled>
    </Layout>
  );
};

const Styled = styled.div`
  > .mt-30 {
    margin-top: 30px;
    &.button-clm {
      display: flex;
      justify-content: center;
      align-items: center;
      > * {
        margin-right: 20px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
`;

export default SignIn;
