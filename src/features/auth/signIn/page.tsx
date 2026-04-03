import { useForm } from "react-hook-form";
import styled from "styled-components";

import Button from "../../../components/button/button";
import Input from "../../../components/form/input";
import Layout from "../../../components/layout/layout";
import { signInHelper, useAuth } from "../../../utils/authHelper";

import type { TypeSignIn } from "../../../lib/types";
import type React from "react";

/* -----------------------------------------------
 * [ root ] /auth/signin ページ
 * ----------------------------------------------- */

const SignIn: React.FC = () => {
  const { refreshAuthState } = useAuth();
  const signInForm = useForm<TypeSignIn>({ defaultValues: { email: "", password: "" } });

  const onSubmit = signInForm.handleSubmit(async (data) => {
    await signInHelper(data);
    refreshAuthState();
  });

  return (
    <Layout type="auth">
      <Styled>
        <h1>SignIn</h1>

        <Input
          className="mt-30"
          errorMessage={signInForm.formState.errors.email?.message}
          label={{ text: "emailを入力してください", required: true }}
          placeholder="○○○○＠○○○○.com"
          type="email"
          {...signInForm.register("email", { required: "必須項目だよ。" })}
        />

        <Input
          className="mt-30"
          errorMessage={signInForm.formState.errors.password?.message}
          label={{ text: "passwordを入力してください", required: true }}
          placeholder="○○○○○○○○"
          type="password"
          {...signInForm.register("password", { required: "必須項目だよ。" })}
        />

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
