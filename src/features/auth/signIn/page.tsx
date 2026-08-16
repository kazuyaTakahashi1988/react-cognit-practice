import { useForm } from "react-hook-form";
import styled from "styled-components";

import { useSignIn } from "./useSignIn";
import Button from "../../../components/button/button";
import ErrorMessage from "../../../components/form/errorMessage";
import Input from "../../../components/form/input";
import Layout from "../../../components/layouts/layout";

import type { SignInValues } from "../../../lib/types";
import type React from "react";

/* -----------------------------------------------
 * SignIn ページ
 * ----------------------------------------------- */

const SignIn: React.FC = () => {
  const signInForm = useForm<SignInValues>({
    defaultValues: { email: "", password: "" },
  });
  const { errorMessage, isSubmitting, resetMessage, submit } = useSignIn(() =>
    signInForm.reset(),
  );

  const onReset = () => {
    signInForm.reset();
    resetMessage();
  };
  const onSubmit = signInForm.handleSubmit(submit);

  return (
    <Layout type="auth">
      <Styled>
        <h1>SignIn</h1>

        <ErrorMessage className="mt-30" errorMessage={errorMessage} />

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
          <Button
            className="secondary"
            disabled={isSubmitting}
            onClick={onReset}
          >
            リセット
          </Button>
          <Button disabled={isSubmitting} onClick={() => onSubmit()}>
            送信する
          </Button>
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
