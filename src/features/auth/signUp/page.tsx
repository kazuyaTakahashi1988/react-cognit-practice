import { useForm } from "react-hook-form";
import styled from "styled-components";

import { useSignUp } from "./useSignUp";
import Button from "../../../components/button/button";
import ErrorMessage from "../../../components/form/errorMessage";
import Input from "../../../components/form/input";
import Layout from "../../../components/layouts/layout";
import { color } from "../../../lib/style";

import type { SignUpValues } from "../../../lib/types";
import type React from "react";

/* -----------------------------------------------
 * SignUp ページ
 * ----------------------------------------------- */

const SignUp: React.FC = () => {
  const signUpForm = useForm<SignUpValues>({
    defaultValues: { email: "", password: "" },
  });
  const { errorMessage, isSubmitting, resetMessages, submit, successMessage } =
    useSignUp(() => signUpForm.reset());

  const onReset = () => {
    signUpForm.reset();
    resetMessages();
  };
  const onSubmit = signUpForm.handleSubmit(submit);

  return (
    <Layout type="auth">
      <Styled>
        <h1>SignUp</h1>

        <ErrorMessage className="mt-30" errorMessage={errorMessage} />

        {successMessage ? (
          <p className="mt-30 success">{successMessage}</p>
        ) : null}

        <Input
          className="mt-30"
          errorMessage={signUpForm.formState.errors.email?.message}
          label={{ text: "emailを入力してください", required: true }}
          placeholder="○○○○＠○○○○.com"
          type="email"
          {...signUpForm.register("email", { required: "必須項目だよ。" })}
        />

        <Input
          className="mt-30"
          errorMessage={signUpForm.formState.errors.password?.message}
          label={{ text: "passwordを入力してください", required: true }}
          placeholder="○○○○○○○○"
          type="password"
          {...signUpForm.register("password", { required: "必須項目だよ。" })}
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
  > .success {
    color: ${color.primary};
  }
`;

export default SignUp;
