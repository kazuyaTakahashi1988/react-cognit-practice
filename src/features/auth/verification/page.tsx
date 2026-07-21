import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import Button from "../../../components/button/button";
import ErrorMessage from "../../../components/form/errorMessage";
import Input from "../../../components/form/input";
import Layout from "../../../components/layouts/layout";
import { color } from "../../../lib/style";
import { verifyHelper } from "../../../utils/authHelper";
import {
  loadingFlagDown,
  loadingFlagUp,
  store,
} from "../../../utils/storeHelper";

import type { TypeVerifyValues } from "../../../lib/types";
import type React from "react";

/* -----------------------------------------------
 * Verification ページ
 * ----------------------------------------------- */

// メタ情報
export const pageMeta = {
  title: "Verification",
  description: "確認コードを入力してアカウント認証を完了するページです。",
  sharePath: "/auth/verification",
  noindex: true, // SEO評価が無用なため noindex を指定
  // ogImage: "/xxxx/xxxx.jpg",
  // ogType: "website" or "article",
};

const Verification: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  /*
   * RHForm 使用設定
   */
  const verifyForm = useForm<TypeVerifyValues>({
    defaultValues: { verificationCode: "", email: "" },
  });

  /*
   * 「リセット」ボタン 処理
   */
  const onReset = () => {
    verifyForm.reset();
    setErrorMessage("");
    setSuccessMessage("");
  };

  /*
   * 「送信する」ボタン 処理
   */
  const onSubmit = verifyForm.handleSubmit((data) => {
    store.dispatch(loadingFlagUp()); // ローディングフラグを上げる

    /* Verify 処理 */
    verifyHelper(data)
      .then(() => {
        onReset();
        setSuccessMessage("Verify 完了、Sign In できるよ！");
      })
      .catch((err: unknown) => {
        const message =
          err instanceof Error ? err.message : "Verify に失敗したよ...";
        setErrorMessage(message);
      })
      .finally(() => {
        store.dispatch(loadingFlagDown()); // ローディングフラグを下げる
      });
  });

  return (
    <Layout pageMeta={pageMeta} type="auth">
      <Styled>
        <h1>Verification</h1>

        {/* エラーメッセージ */}
        <ErrorMessage className="mt-30" errorMessage={errorMessage} />

        {/* 成功メッセージ */}
        {successMessage ? (
          <p className="mt-30 success">{successMessage}</p>
        ) : null}

        {/* インプット項目 - password（verificationCode） */}
        <Input
          className="mt-30"
          errorMessage={verifyForm.formState.errors.verificationCode?.message}
          label={{ text: "verificationCodeを入力してください", required: true }}
          placeholder="○○○○○○○○"
          type="password"
          {...verifyForm.register("verificationCode", {
            required: "必須項目だよ。",
          })}
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
          <Button className="secondary" onClick={() => onReset()}>
            リセット
          </Button>
          <Button onClick={() => onSubmit()}>送信する</Button>
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

export default Verification;
