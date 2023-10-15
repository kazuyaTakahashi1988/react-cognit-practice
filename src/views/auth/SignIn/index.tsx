import React from 'react'
import '../../../App.css'
import { SubmitHandler, useForm } from 'react-hook-form';

import { PropsSignIn } from "../../../lib/props";
import { SignInHelper } from '../../../utils/auth'

import Input from '../../../components/form/input'

const SignIn: React.FC = () => {
  const { handleSubmit, control, reset } = useForm<PropsSignIn>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSignIn: SubmitHandler<PropsSignIn> = (data: PropsSignIn) => {
    SignInHelper(data)
    reset();
  };

  return (
    <div className="sign-in">
      <h1>サインイン</h1>
      <form onSubmit={handleSubmit(onSignIn)} >
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
