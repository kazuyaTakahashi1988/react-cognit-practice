import { useForm } from "react-hook-form";
import styled from "styled-components";

import Button from "../../../components/button/button";
import Input from "../../../components/form/input";
import Layout from "../../../components/layouts/layout";
import { verifyHelper } from "../../../utils/authHelper";

import type { TypeVerifyValues } from "../../../lib/types";
import type React from "react";

/* -----------------------------------------------
 * Verification ページ
 * ----------------------------------------------- */

const Verification: React.FC = () => {
  /*
   * RHForm 使用設定
   */
  const verifyForm = useForm<TypeVerifyValues>({
    defaultValues: { verificationCode: "", email: "" },
  });

  /*
   * 「送信する」ボタン 処理
   */
  const onSubmit = verifyForm.handleSubmit((data) => {
    verifyHelper(data); // ベリファイ処理
  });

  return (
    <Layout
      meta={{
        title: "Verification",
        description: "確認コードを入力してアカウント認証を完了するページです。",
        ogImage: "/vite.svg",
        shareText: "React Cognito Practice の認証ページです。",
      }}
      type="auth"
    >
      <Styled>
        <h1>Verification</h1>

        {/* インプット項目 - password（verificationCode） */}
        <Input
          className="mt-30"
          errorMessage={verifyForm.formState.errors.verificationCode?.message}
          label={{ text: "verificationCodeを入力してください", required: true }}
          placeholder="○○○○○○○○"
          type="password"
          {...verifyForm.register("verificationCode", { required: "必須項目だよ。" })}
        />

        {/* インプット項目 - E-mail */}
        <Input
          className="mt-30"
          errorMessage={verifyForm.formState.errors.email?.message}
          label={{ text: "emailを入力してください", required: true }}
          placeholder="○○○○＠○○○○.com"
          type="email"
          {...verifyForm.register("email", { required: "必須項目だよ。" })}
        />

        {/* ボタン */}
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
