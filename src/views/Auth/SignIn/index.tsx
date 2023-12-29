import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { PropsSignIn } from "../../../lib/";

import Layout from "../../../components/Layout/Layout";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Form/Input";

import { SignInHelper } from "../../../utils/Auth";

const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PropsSignIn>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    SignInHelper(data);
  });

  return (
    <Layout type="auth">
      <Styled>
        <h1>SignIn</h1>

        <Input
          type="email"
          className="mt-30"
          placeholder="○○○○＠○○○○.com"
          label={{ text: "emailを入力してください", required: true }}
          {...register("email", { required: "必須項目だよ。" })}
          errors={errors}
        />

        <Input
          type="password"
          className="mt-30"
          placeholder="○○○○○○○○"
          label={{ text: "passwordを入力してください", required: true }}
          {...register("password", { required: "必須項目だよ。" })}
          errors={errors}
        />

        <div className="mt-30 button-clm">
          <Button className="secondary" onClick={() => reset()}>
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
