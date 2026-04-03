import { useForm } from "react-hook-form";
import styled from "styled-components";

import Button from "../../../components/button/button";
import Input from "../../../components/form/input";
import Layout from "../../../components/layouts/layout";
import { signUpHelper } from "../../../utils/authHelper";

import type { TypeSignUp } from "../../../lib/types";
import type React from "react";

/* -----------------------------------------------
 * "[root]/auth/signup" ページ
 * ----------------------------------------------- */

const SignUp: React.FC = () => {
  const signUpForm = useForm<TypeSignUp>({ defaultValues: { email: "", password: "" } });

  const onSubmit = signUpForm.handleSubmit((data) => {
    signUpHelper(data);
  });

  return (
    <Layout type="auth">
      <Styled>
        <form>
          <h1>SignUp</h1>

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
