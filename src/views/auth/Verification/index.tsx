import React from 'react'
import '../../../App.css'
import { SubmitHandler, useForm } from 'react-hook-form';

import { PropsVerify } from "../../../lib/props";
import { VerifyHelper } from '../../../utils/auth'

import Input from '../../../components/form/Input'

const Verification: React.FC = () => {
  const { handleSubmit, control, reset } = useForm<PropsVerify>({
    defaultValues: {
      verificationCode: '',
      email: '',
    },
  });

  const onVerify: SubmitHandler<PropsVerify> = (data: PropsVerify) => {
    VerifyHelper(data)
    reset();
  };

  return (
    <div className="verification">
      <h1>ベリフィケーション</h1>
      <form onSubmit={handleSubmit(onVerify)} >
        <Input
          name={'verificationCode'}
          type={'password'}
          placeholder={`verificationCodeを入力してください。`}
          control={control}
          rules={{
            required: { value: true, message: '必須項目です。' },
            // maxLength: { value: 20, message: '文字数は10文字以内です。' },
          }}
          disabled={false}
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
        <button type={'submit'} >
          投稿
        </button>
      </form>
    </div>
  )
}

export default Verification
