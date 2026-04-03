import { useForm } from "react-hook-form";
import styled from "styled-components";

import Button from "../../../components/button/button";
import Input from "../../../components/form/input";
import Layout from "../../../components/layouts/layout";
import { signUpHelper } from "../../../utils/authHelper";

import type { TypeSignUpValues } from "../../../lib/types";
import type React from "react";

/* -----------------------------------------------
 * "[root]/auth/signup" ページ
 * ----------------------------------------------- */

const SignUp: React.FC = () => {
  /*
   * RHForm 使用設定
   */
  const signUpForm = useForm<TypeSignUpValues>({ defaultValues: { email: "", password: "" } });

  /*
   * 「送信する」ボタン 処理
   */
  const onSubmit = signUpForm.handleSubmit((data) => {
    signUpHelper(data); // サインアップ処理
  });

  return (
    <Layout type="auth">
      <Styled>
        <form>
          <h1>SignUp</h1>

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
            <Button className="secondary" onClick={() => signUpForm.reset()}>
              リセット
            </Button>
            <Button onClick={() => onSubmit()}>送信する</Button>
          </div>
        </form>
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

export default SignUp;
