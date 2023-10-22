import React from 'react'
import '../../../App.css'
import { SubmitHandler, useForm } from 'react-hook-form';

import { PropsSignUp } from "../../../lib/props";
import { SignUpHelper } from '../../../utils/auth'

import Input from '../../../components/form/Input'

const SignUp: React.FC = () => {
  const { handleSubmit, control, reset } = useForm<PropsSignUp>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSignUp: SubmitHandler<PropsSignUp> = (data: PropsSignUp) => {
    SignUpHelper(data)
    reset();
  };

  return (
    <div className="sign-up">
      <h1>サインアップ（ユーザー作成）</h1>
      <form onSubmit={handleSubmit(onSignUp)} >
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

export default SignUp
