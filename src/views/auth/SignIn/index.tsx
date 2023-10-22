import React from 'react'
import '../../../App.css'
import { SubmitHandler, useForm } from 'react-hook-form';

import { PropsSignIn } from "../../../lib/props";
import { SignInHelper } from '../../../utils/auth'

import Input from '../../../components/form/Input'
import SelectBox from '../../../components/form/SelectBox'
import TextArea from '../../../components/form/TextArea'
import CheckBox from '../../../components/form/CheckBox'

const SignIn: React.FC = () => {
  const { handleSubmit, control, reset } = useForm<PropsSignIn>({
    defaultValues: {
      selectId: '',
      content: '',
      checked: [],
      email: '',
      password: '',
    },
  });

  const onSignIn: SubmitHandler<PropsSignIn> = (data: PropsSignIn) => {
    console.log(data);
    SignInHelper(data)
    reset();
  };

  return (
    <div className="sign-in">
      <h1>サインイン</h1>
      <form onSubmit={handleSubmit(onSignIn)} >
        <SelectBox
          name={'selectId'}
          placeholder={'性別をお選びください'}
          options={[
            { value: 0, label: "女性" },
            { value: 1, label: "男性" },
            { value: 2, label: "未回答" },
          ]}
          control={control}
          rules={{
            required: { value: true, message: '必須項目です。' },
            // maxLength: { value: 20, message: '文字数は20文字以内です。' },
          }}
          disabled={false}
        />
        <TextArea
          name={'content'}
          placeholder={`内容を入力してください。`}
          control={control}
          rules={{
            required: { value: true, message: '必須項目です。' },
            // maxLength: { value: 20, message: '文字数は20文字以内です。' },
          }}
          disabled={false}
        />
        <CheckBox
          name={'checked'}
          options={[
            {
              id: "sushi",
              label: "寿司",
              checked: false,
              disabled: false,
            },
            {
              id: "yakiniku",
              label: "焼肉",
              checked: false,
              disabled: false,
            },
            {
              id: "khao_mangai",
              label: "カオマンガイ",
              checked: false,
              disabled: false,
            },
          ]}
          control={control}
          rules={{
            required: { value: true, message: '必須項目です。' },
            // maxLength: { value: 20, message: '文字数は20文字以内です。' },
          }}
        />
        <Input
          name={'email'}
          type={'email'}
          placeholder={`emailを入力してください。`}
          control={control}
          rules={{
            required: { value: true, message: '必須項目です。' },
            // maxLength: { value: 20, message: '文字数は20文字以内です。' },
          }}
          disabled={false}
        />
        <Input
          name={'password'}
          type={'password'}
          placeholder={`passwordを入力してください。`}
          control={control}
          rules={{
            required: { value: true, message: '必須項目です。' },
            // maxLength: { value: 20, message: '文字数は10文字以内です。' },
          }}
          disabled={false}
        />
        <button type={'submit'} >
          投稿
        </button>
      </form>
    </div>
  )
}

export default SignIn
