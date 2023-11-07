import React from 'react';
import '../../../App.css';
import { useForm } from 'react-hook-form';
import { PropsVerification } from '../../../lib/props';

import { Input } from '../../../components/Form/Input';

import { VerifyHelper } from '../../../utils/Auth';

const Verification: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<PropsVerification>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
      verificationCode: '',
      email: '',
    },
  });


  const onSubmit = handleSubmit((data) => {
    console.log(data);
    VerifyHelper(data);
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <h1>Verification</h1>
        <Input
          type="password"
          placeholder="verificationCodeを入力してください"
          {...register('verificationCode', {
            required: { value: true, message: '必須項目だよ。' },
          },)}
          errorMessage={errors.verificationCode?.message}
        />

        <br /><br />

        <Input
          type="email"
          placeholder="emailを入力してください"
          {...register('email', {
            required: { value: true, message: '必須項目だよ。' },
          },)}
          errorMessage={errors.email?.message}
        />

        <br /><br />

        <button type="button" onClick={() => reset()}>
          リセット
        </button>
        <button>送信</button>
      </form>
    </>
  );
};

export default Verification;
