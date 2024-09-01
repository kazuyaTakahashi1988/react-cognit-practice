import React from "react";
import styled from "styled-components";
import { TypeVerification } from "../../../lib/types";
import { useForm } from "react-hook-form";

import Layout from "../../../components/layout/layout";
import Button from "../../../components/button/button";
import Input from "../../../components/form/input";

import { VerifyHelper } from "../../../utils/auth";

const Verification: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TypeVerification>({
    defaultValues: {
      verificationCode: "",
      email: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    VerifyHelper(data);
  });

  return (
    <Layout type="auth">
      <Styled>
        <h1>Verification</h1>

        <Input
          type="password"
          className="mt-30"
          placeholder="○○○○○○○○"
          label={{
            text: "verificationCodeを入力してください",
            required: true,
          }}
          {...register("verificationCode", { required: "必須項目だよ。" })}
          errors={errors}
        />

        <Input
          type="email"
          className="mt-30"
          placeholder="○○○○＠○○○○.com"
          label={{ text: "emailを入力してください", required: true }}
          {...register("email", { required: "必須項目だよ。" })}
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

export default Verification;
