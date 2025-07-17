import { useForm } from "react-hook-form";
import styled from "styled-components";

import Button from "../../../components/button/button";
import Input from "../../../components/form/input";
import Layout from "../../../components/layout/layout";
import { SignUpHelper } from "../../../utils/authHelper";

import type { TypeSignUp } from "../../../lib/types";
import type React from "react";

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TypeSignUp>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    SignUpHelper(data);
  });

  return (
    <Layout type="auth">
      <Styled>
        <form>
          <h1>SignUp</h1>

          <Input
            type="email"
            className="mt-30"
            placeholder="○○○○＠○○○○.com"
            label={{ text: "emailを入力してください", required: true }}
            {...register("email", { required: "必須項目だよ。" })}
            errorMessage={errors.email?.message}
          />

          <Input
            type="password"
            className="mt-30"
            placeholder="○○○○○○○○"
            label={{ text: "passwordを入力してください", required: true }}
            {...register("password", { required: "必須項目だよ。" })}
            errorMessage={errors.password?.message}
          />

          <div className="mt-30 button-clm">
            <Button className="secondary" onClick={() => reset()}>
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
