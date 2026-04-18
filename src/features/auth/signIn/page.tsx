import { useForm } from "react-hook-form";
import styled from "styled-components";

import Button from "../../../components/button/button";
import Input from "../../../components/form/input";
import Layout from "../../../components/layouts/layout";
import { signInHelper, useAuth } from "../../../utils/authHelper";

import type { TypeSignInValues } from "../../../lib/types";
import type React from "react";

/* -----------------------------------------------
 * signIn ページ
 * ----------------------------------------------- */

// ページメタ情報
export const pageMeta = {
  title: "Sign In",
  description: "メールアドレスとパスワードでログインするページです。",
  sharePath: "/auth/signin",
};

const SignIn: React.FC = () => {
  const { refreshAuthState } = useAuth();

  /*
   * RHForm 使用設定
   */
  const signInForm = useForm<TypeSignInValues>({ defaultValues: { email: "", password: "" } });

  /*
   * 「送信する」ボタン 処理
   */
  const onSubmit = signInForm.handleSubmit(async (data) => {
    await signInHelper(data); // サインイン処理
    refreshAuthState(); // 認証状態を更新する処理
  });

  return (
    <Layout pageMeta={pageMeta} type="auth">
      <Styled>
        <h1>SignIn</h1>

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
          <Button className="secondary" onClick={() => signInForm.reset()}>
            リセット
          </Button>
          <Button onClick={() => onSubmit()}>送信する</Button>
        </div>
      </Styled>
    </Layout>
  );
};

const Styled = styled.div`
  .mt-30 {
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
