import { useForm } from "react-hook-form";
import styled from "styled-components";

import Button from "../../../components/button/button";
import Input from "../../../components/form/input";
import Layout from "../../../components/layout/layout";
import { verifyHelper } from "../../../utils/authHelper";

import type { TypeVerify } from "../../../lib/types";
import type React from "react";

/* -----------------------------------------------
 * "[root]/auth/verification" ページ
 * ----------------------------------------------- */

const Verification: React.FC = () => {
  const verifyForm = useForm<TypeVerify>({ defaultValues: { verificationCode: "", email: "" } });

  const onSubmit = verifyForm.handleSubmit((data) => {
    verifyHelper(data);
  });

  return (
    <Layout type="auth">
      <Styled>
        <h1>Verification</h1>

        <Input
          className="mt-30"
          errorMessage={verifyForm.formState.errors.verificationCode?.message}
          label={{ text: "verificationCodeを入力してください", required: true }}
          placeholder="○○○○○○○○"
          type="password"
          {...verifyForm.register("verificationCode", { required: "必須項目だよ。" })}
        />

        <Input
          className="mt-30"
          errorMessage={verifyForm.formState.errors.email?.message}
          label={{ text: "emailを入力してください", required: true }}
          placeholder="○○○○＠○○○○.com"
          type="email"
          {...verifyForm.register("email", { required: "必須項目だよ。" })}
        />

        <div className="mt-30 button-clm">
          <Button className="secondary" onClick={() => verifyForm.reset()}>
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
