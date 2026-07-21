import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import Button from "../../../components/button/button";
import { ErrorMessage } from "../../../components/form/errorMessage";
import Input from "../../../components/form/input";
import Layout from "../../../components/layouts/layout";
import { color } from "../../../lib/style";
import { signUpHelper } from "../../../utils/authHelper";
import {
  loadingFlagDown,
  loadingFlagUp,
  store,
} from "../../../utils/storeHelper";

import type { TypeSignUpResult, TypeSignUpValues } from "../../../lib/types";
import type React from "react";

/* -----------------------------------------------
 * SignUp ページ
 * ----------------------------------------------- */

// メタ情報
export const pageMeta = {
  title: "Sign Up",
  description: "メールアドレスとパスワードでアカウントを作成するページです。",
  sharePath: "/auth/signup",
  noindex: true, // SEO評価が無用なため noindex を指定
  // ogImage: "/xxxx/xxxx.jpg",
  // ogType: "website" or "article",
};

const SignUp: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  /*
   * RHForm 使用設定
   */
  const signUpForm = useForm<TypeSignUpValues>({
    defaultValues: { email: "", password: "" },
  });

  /*
   * 「リセット」ボタン 処理
   */
  const onReset = () => {
    signUpForm.reset();
    setErrorMessage("");
    setSuccessMessage("");
  };

  /*
   * 「送信する」ボタン 処理
   */
  const onSubmit = signUpForm.handleSubmit((data) => {
    store.dispatch(loadingFlagUp()); // ローディングフラグを上げる

    /* Sign Up 処理 */
    signUpHelper(data)
      .then((res: TypeSignUpResult) => {
        const noVerify = res.isSignUpComplete === true; // verifyの手順必要かフラグ
        const message = noVerify
          ? "Sign Up 成功! Sign In しよう！" // verify 不要時
          : "OK！ Verify用のコードをメールで送ったから確認してね！"; // verify 必要時
        onReset();
        setSuccessMessage(message);
      })
      .catch((err: unknown) => {
        const message =
          err instanceof Error ? err.message : "Sign Up に失敗したよ...";
        setErrorMessage(message);
      })
      .finally(() => {
        store.dispatch(loadingFlagDown()); // ローディングフラグを下げる
      });
  });

  return (
    <Layout pageMeta={pageMeta} type="auth">
      <Styled>
        <h1>SignUp</h1>

        {/* エラーメッセージ */}
        <ErrorMessage className="mt-30" errorMessage={errorMessage} />

        {/* 成功メッセージ */}
        {successMessage ? (
          <p className="mt-30 success">{successMessage}</p>
        ) : null}

        {/* インプット項目 - E-mail */}
        <Input
          className="mt-30"
          errorMessage={signUpForm.formState.errors.email?.message}
          label={{ text: "emailを入力してください", required: true }}
          placeholder="○○○○＠○○○○.com"
          type="email"
          {...signUpForm.register("email", { required: "必須項目だよ。" })}
        />

        {/* インプット項目 - Password */}
        <Input
          className="mt-30"
          errorMessage={signUpForm.formState.errors.password?.message}
          label={{ text: "passwordを入力してください", required: true }}
          placeholder="○○○○○○○○"
          type="password"
          {...signUpForm.register("password", { required: "必須項目だよ。" })}
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
  > .success {
    color: ${color.primary};
  }
`;

export default SignUp;
