import React from "react";
import styled from "styled-components";
import { media, params } from "../../../lib/Style";
import { PropsFormExample } from "../../../lib/Props";
import { useForm } from "react-hook-form";

import Layout from "../../../components/Layout/Layout";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Form/Input";
import CheckBox from "../../../components/Form/CheckBox";
import RadioButton from "../../../components/Form/RadioButton";
import SwitchButton from "../../../components/Form/SwitchButton";
import Select from "../../../components/Form/Select";
import SelectCustom from "../../../components/Form/SelectCustom";
import TextArea from "../../../components/Form/TextArea";

const FormExample: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PropsFormExample>({
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

  const onSubmit = handleSubmit((data) => {
    console.log(data);
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

        <Input
          className="mt-30"
          placeholder="入力をお願いします。"
          label={{ text: "Inputラベルテキスト", required: true }}
          {...register("inputName", {
            required: { value: true, message: "必須項目だよ。" },
            minLength: { value: 2, message: `2文字以上にしてね` },
            maxLength: { value: 50, message: "最大50文字だよ" },
            // pattern: {
            //   value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/,
            //   message: `英数文字のみにしてね`
            // },
          })}
          errors={errors}
        />

        <CheckBox
          className="mt-30"
          label={{ text: "CheckBoxラベルテキスト", required: true }}
          options={[
            { value: "Check_Value_A", label: "Check_Label_A" },
            { value: "Check_Value_B", label: "Check_Label_B" },
            { value: "Check_Value_C", label: "Check_Label_C" },
          ]}
          {...register("checkBoxName", {
            required: { value: true, message: "必須項目だよ。" },
            validate: (e: object) => {
              if (Object.keys(e).length < 2)
                return "２つ以上選択してください。";
            },
          })}
          errors={errors}
        />

        <RadioButton
          className="mt-30"
          label={{ text: "RadioButtonラベルテキスト", required: true }}
          options={[
            { value: "Radio_Value_A", label: "Radio_Label_A" },
            { value: "Radio_Value_B", label: "Radio_Label_B" },
            { value: "Radio_Value_C", label: "Radio_Label_C" },
          ]}
          {...register("radioButtonName", {
            required: { value: true, message: "必須項目だよ。" },
          })}
          errors={errors}
        />

        <SwitchButton
          className="mt-30"
          label={{ text: "SwitchButtonラベルテキスト", required: true }}
          options={[
            {
              value: "Switch_Value_A",
              label: "noActive_A",
              labelActived: "Actived_A",
            },
            {
              value: "Switch_Value_B",
              label: "noActive_B",
              labelActived: "Actived_B",
            },
            {
              value: "Switch_Value_C",
              label: "----------",
            },
          ]}
          {...register("switchButtonName", {
            required: { value: true, message: "必須項目だよ。" },
          })}
          errors={errors}
        />

        <Select
          className="mt-30"
          placeholder="選択してください。"
          label={{ text: "Selectラベルテキスト", required: true }}
          options={[
            { value: "Select_Value_A", label: "Select_Label_A" },
            { value: "Select_Value_B", label: "Select_Label_B" },
            { value: "Select_Value_C", label: "Select_Label_C" },
          ]}
          {...register("selectName", {
            required: { value: true, message: "必須項目だよ。" },
          })}
          errors={errors}
        />

        <SelectCustom
          className="mt-30"
          placeholder="選択してください。"
          label={{ text: "SelectCustomラベルテキスト", required: true }}
          options={[
            { value: "Select_Value_A", label: "Select_Label_A" },
            { value: "Select_Value_B", label: "Select_Label_B" },
            { value: "Select_Value_C", label: "Select_Label_C" },
            { value: "Select_Value_D", label: "Select_Label_D" },
            { value: "Select_Value_E", label: "Select_Label_E" },
            { value: "Select_Value_F", label: "Select_Label_F" },
            { value: "Select_Value_G", label: "Select_Label_G" },
          ]}
          {...register("selectCustomName", {
            required: { value: true, message: "必須項目だよ。" },
          })}
          errors={errors}
        />

        <TextArea
          className="mt-30"
          placeholder="入力をお願いします。"
          label={{ text: "TextAreaラベルテキスト", required: true }}
          {...register("textAreaName", {
            required: { value: true, message: "必須項目だよ。" },
            minLength: { value: 2, message: `2文字以上にしてね` },
            maxLength: { value: 50, message: "最大50文字だよ" },
            // pattern: {
            //   value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/,
            //   message: `英数文字のみにしてね`
            // },
          })}
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
    lib/Style/_mixin 試し書き
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
