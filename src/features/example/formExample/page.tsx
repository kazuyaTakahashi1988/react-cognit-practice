import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "../../../components/button/button";
import CheckBox from "../../../components/form/checkBox";
import Input from "../../../components/form/input";
import RadioButton from "../../../components/form/radioButton";
import Select from "../../../components/form/select";
import SelectCustom from "../../../components/form/selectCustom";
import SwitchButton from "../../../components/form/switchButton";
import TextArea from "../../../components/form/textArea";
import Layout from "../../../components/layouts/layout";
import { color, media } from "../../../lib/style";
import { testPostApi } from "../../../utils/apiHelper";

import type { TypeFormExampleValues } from "../../../lib/types";
import type React from "react";

/* -----------------------------------------------
 * FormExample ページ
 * ----------------------------------------------- */

// メタ情報
export const pageMeta = {
  title: "Form Example",
  description: "react-hook-form を使った入力フォームコンポーネントのサンプルページです。",
  sharePath: "/example/form_example",
  // ogImage: "/xxxx/xxxx.jpg",
  // ogType: "website" or "article",
  // noindex: boolean,
};

const FormExample: React.FC = () => {
  const navigate = useNavigate();

  /*
   * RHForm 使用設定
   */
  const form = useForm<TypeFormExampleValues>({
    mode: "onSubmit", // 'onChange' or 'onBlur' or 'onSubmit' or 'onTouched' or 'all'
    reValidateMode: "onChange", // 'onChange' or 'onBlur' or 'onSubmit'
    criteriaMode: "all", // 'firstError' or 'all'
    defaultValues: {
      name: "",
      genres: [],
      inquiry: "",
      payment: "",
      theme: "",
      address: "",
      description: "",
    },
  });

  /*
   * 「送信する」ボタン 処理
   */
  const onSubmit = form.handleSubmit(async (data) => {
    const responsePost = await testPostApi(data); // テストポストAPI（てきとーなやつ）処理
    if (responsePost.status !== 200) {
      navigate("/error/500", { replace: true });
    }
  });

  return (
    <Layout pageMeta={pageMeta} type="example">
      <Styled>
        <h1>
          <span>
            FormExample
            <br />
            <small>：react-hook-form</small>
          </span>
        </h1>

        {/* インプット項目 */}
        <Input
          className="mt-30"
          errorMessage={form.formState.errors.name?.message}
          label={{ text: "お名前", required: true }}
          placeholder="プレイスホルダー テキスト"
          {...form.register("name", {
            required: { value: true, message: "必須項目だよ。" },
            minLength: { value: 2, message: "2文字以上にしてね" },
            maxLength: { value: 50, message: "最大50文字だよ" },
          })}
        />

        {/* チェックボックス項目 */}
        <CheckBox
          className="mt-30"
          errorMessage={form.formState.errors.genres?.message}
          label={{ text: "よく視聴するジャンル", required: true }}
          options={[
            { label: "アクション", value: "action" },
            { label: "コメディ", value: "comedy" },
            { label: "ドラマ", value: "drama" },
          ]}
          {...form.register("genres", {
            required: { value: true, message: "必須項目だよ。" },
            validate: (checkedValues: string[]) => {
              if (checkedValues.length < 2) return "２つ以上選択してください。";
            },
          })}
        />

        {/* ラジオボタン項目 */}
        <RadioButton
          className="mt-30"
          errorMessage={form.formState.errors.inquiry?.message}
          label={{ text: "お問い合わせ方法", required: true }}
          options={[
            { label: "メール", value: "email" },
            { label: "SMS", value: "sms" },
            { label: "アプリ通知", value: "push" },
          ]}
          {...form.register("inquiry", { required: { value: true, message: "必須項目だよ。" } })}
        />

        {/* スイッチボタン項目 */}
        <SwitchButton
          className="mt-30"
          errorMessage={form.formState.errors.payment?.message}
          label={{ text: "お支払い方法", required: true }}
          options={[
            { label: "クレジットカード", value: "card" },
            { label: "銀行振込", value: "bank" },
            { label: "電子マネー", value: "wallet" },
          ]}
          type="radio" // or "checkbox"
          {...form.register("payment", { required: { value: true, message: "必須項目だよ。" } })}
        />

        {/* セレクトボックス項目 */}
        <Select
          className="mt-30"
          errorMessage={form.formState.errors.theme?.message}
          label={{ text: "テーマ色の選択", required: true }}
          options={[
            { label: "シアン", value: "cyan" },
            { label: "マゼンタ", value: "magenta" },
            { label: "イエロー", value: "yellow" },
          ]}
          placeholder="選択してください。"
          {...form.register("theme", { required: { value: true, message: "必須項目だよ。" } })}
        />

        {/* セレクトカスタムボックス項目 */}
        <SelectCustom
          className="mt-30"
          errorMessage={form.formState.errors.address?.message}
          label={{ text: "都道府県", required: true }}
          options={[
            { label: "東京都", value: "tokyo" },
            { label: "大阪府", value: "osaka" },
            { label: "愛知県", value: "aichi" },
            { label: "埼玉県", value: "saitama" },
            { label: "千葉県", value: "chiba" },
            { label: "栃木県", value: "tochigi" },
            { label: "茨城県", value: "ibaraki" },
            { label: "静岡県", value: "shizuoka" },
          ]}
          placeholder="選択してください。"
          {...form.register("address", { required: { value: true, message: "必須項目だよ。" } })}
        />

        {/* テキストエリア項目 */}
        <TextArea
          className="mt-30"
          errorMessage={form.formState.errors.description?.message}
          label={{ text: "ご相談の内容", required: true }}
          placeholder="入力をお願いします。"
          {...form.register("description", {
            required: { value: true, message: "必須項目だよ。" },
            minLength: { value: 2, message: "2文字以上にしてね" },
            maxLength: { value: 50, message: "最大50文字だよ" },
          })}
        />

        {/* ボタン */}
        <div className="mt-30 button-clm">
          <Button className="secondary" onClick={() => form.reset()}>
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
      flex-wrap: wrap;
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

  /* ---------------------------------------------- 
    "lib/style/_variable" 試し書き
  ---------------------------------------------- */
  color: ${color.black};

  // @media (min-width: 769px){ ・・・ } の内容が記述できるよ
  ${media.pc} {
  }

  // @media (max-width: 1080px){ ・・・ } の内容が記述できるよ
  ${media.tab} {
  }

  // @media (max-width: 768px){ ・・・ } の内容が記述できるよ
  ${media.sp} {
  }
`;

export default FormExample;
