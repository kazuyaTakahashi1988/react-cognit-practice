import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { useSignUp } from "./util";
import Button from "../../../components/button/button";
import ErrorMessage from "../../../components/form/errorMessage";
import Input from "../../../components/form/input";
import Layout from "../../../components/layouts/layout";
import { color } from "../../../lib/style";

import type { SignUpResult, SignUpValues } from "./type";
import type React from "react";

/* -----------------------------------------------
 * SignUp ページ
 * ----------------------------------------------- */

const SignUp: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { signUp } = useSignUp();

  /*
   * RHForm 使用設定
   */
  const signUpForm = useForm<SignUpValues>({
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
  const onSubmit = signUpForm.handleSubmit(async (data) => {
    try {
      const result: SignUpResult = await signUp(data);
      const noVerify = result.isSignUpComplete === true; // verifyの手順必要かフラグ
      const message = noVerify
        ? "Sign Up 成功! Sign In しよう！" // verify 不要時
        : "OK！ Verify用のコードをメールで送ったから確認してね！"; // verify 必要時
      onReset();
      setSuccessMessage(message);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Sign Up に失敗したよ...";
      setErrorMessage(message);
    }
  });

  return (
    <Layout type="auth">
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
