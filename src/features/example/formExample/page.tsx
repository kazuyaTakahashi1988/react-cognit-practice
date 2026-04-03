import { useForm } from "react-hook-form";
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
import { media, params } from "../../../lib/style";
import { testPostApi } from "../../../utils/apiHelper"; // テストポストAPI（てきとーなやつ）

import type { TypeFormExampleValues } from "../../../lib/types";
import type React from "react";

/* -----------------------------------------------
 * "[root]/example/form_example" ページ
 * ----------------------------------------------- */

const FormExample: React.FC = () => {
  /*
   * RHForm 使用設定
   */
  const form = useForm<TypeFormExampleValues>({
    mode: "onSubmit", // 'onChange' or 'onBlur' or 'onSubmit' or 'onTouched' or 'all'
    reValidateMode: "onChange", // 'onChange' or 'onBlur' or 'onSubmit'
    criteriaMode: "all", // 'firstError' or 'all'
    defaultValues: {
      inputName: "",
      checkBoxName: [],
      radioButtonName: "",
      switchButtonName: "",
      selectName: "",
      selectCustomName: "",
      textAreaName: "",
    },
  });

  /*
   * 「送信する」ボタン 処理
   */
  const onSubmit = form.handleSubmit(async (data) => {
    const responsePost = await testPostApi(data); // テストポストAPI（てきとーなやつ）処理
    console.warn("API response:", responsePost);
  });

  return (
    <Layout type="example">
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
          errorMessage={form.formState.errors.inputName?.message}
          label={{ text: "Inputラベルテキスト", required: true }}
          placeholder="入力をお願いします。"
          {...form.register("inputName", {
            required: { value: true, message: "必須項目だよ。" },
            minLength: { value: 2, message: "2文字以上にしてね" },
            maxLength: { value: 50, message: "最大50文字だよ" },
            // pattern: {
            //   value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/,
            //   message: `英数文字のみにしてね`
            // },
          })}
        />

        {/* チェックボックス項目 */}
        <CheckBox
          className="mt-30"
          errorMessage={form.formState.errors.checkBoxName?.message}
          label={{ text: "CheckBoxラベルテキスト", required: true }}
          options={[
            { value: "Check_Value_A", label: "Check_Label_A" },
            { value: "Check_Value_B", label: "Check_Label_B" },
            { value: "Check_Value_C", label: "Check_Label_C" },
          ]}
          {...form.register("checkBoxName", {
            required: { value: true, message: "必須項目だよ。" },
            validate: (checkedValues: string[]) => {
              if (checkedValues.length < 2) return "２つ以上選択してください。";
            },
          })}
        />

        {/* ラジオボタン項目 */}
        <RadioButton
          className="mt-30"
          errorMessage={form.formState.errors.radioButtonName?.message}
          label={{ text: "RadioButtonラベルテキスト", required: true }}
          options={[
            { value: "Radio_Value_A", label: "Radio_Label_A" },
            { value: "Radio_Value_B", label: "Radio_Label_B" },
            { value: "Radio_Value_C", label: "Radio_Label_C" },
          ]}
          {...form.register("radioButtonName", {
            required: { value: true, message: "必須項目だよ。" },
          })}
        />

        {/* スイッチボタン項目 */}
        <SwitchButton
          className="mt-30"
          errorMessage={form.formState.errors.switchButtonName?.message}
          label={{ text: "SwitchButtonラベルテキスト", required: true }}
          options={[
            { value: "Switch_Value_A", label: "noActive_A", labelActived: "Actived_A" },
            { value: "Switch_Value_B", label: "noActive_B", labelActived: "Actived_B" },
            { value: "Switch_Value_C", label: "----------" },
          ]}
          {...form.register("switchButtonName", {
            required: { value: true, message: "必須項目だよ。" },
          })}
        />

        {/* セレクトボックス項目 */}
        <Select
          className="mt-30"
          errorMessage={form.formState.errors.selectName?.message}
          label={{ text: "Selectラベルテキスト", required: true }}
          options={[
            { value: "Select_Value_A", label: "Select_Label_A" },
            { value: "Select_Value_B", label: "Select_Label_B" },
            { value: "Select_Value_C", label: "Select_Label_C" },
          ]}
          placeholder="選択してください。"
          {...form.register("selectName", { required: { value: true, message: "必須項目だよ。" } })}
        />

        {/* セレクトカスタムボックス項目 */}
        <SelectCustom
          className="mt-30"
          errorMessage={form.formState.errors.selectCustomName?.message}
          label={{ text: "SelectCustomラベルテキスト", required: true }}
          options={[
            { value: "Select_Value_A", label: "Select_Label_A" },
            { value: "Select_Value_B", label: "Select_Label_B" },
            { value: "Select_Value_C", label: "Select_Label_C" },
            { value: "Select_Value_D", label: "Select_Label_D" },
            { value: "Select_Value_E", label: "Select_Label_E" },
          ]}
          placeholder="選択してください。"
          {...form.register("selectCustomName", {
            required: { value: true, message: "必須項目だよ。" },
          })}
        />

        {/* テキストエリア項目 */}
        <TextArea
          className="mt-30"
          errorMessage={form.formState.errors.textAreaName?.message}
          label={{ text: "TextAreaラベルテキスト", required: true }}
          placeholder="入力をお願いします。"
          {...form.register("textAreaName", {
            required: { value: true, message: "必須項目だよ。" },
            minLength: { value: 2, message: "2文字以上にしてね" },
            maxLength: { value: 50, message: "最大50文字だよ" },
            // pattern: {
            //   value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/,
            //   message: `英数文字のみにしてね`
            // },
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
  color: ${params.black};
  ${media.pc} {
    /* @media (min-width: 769px){} の内容が記述できるよ */
  }
  ${media.sp} {
    /* @media (max-width: 768px){} の内容が記述できるよ */
  }
  ${media.tab} {
    /* @media (max-width: 1080px){} の内容が記述できるよ */
  }
`;

export default FormExample;
