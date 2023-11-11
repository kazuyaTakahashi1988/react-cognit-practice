import React from 'react';
import '../../../App.css';
import { useForm } from 'react-hook-form';
import { PropsSignIn } from '../../../lib/props';

import { Input } from '../../../components/Form/Input';

import { SignInHelper } from '../../../utils/Auth';

const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<PropsSignIn>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    SignInHelper(data);
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <h1>SignIn</h1>
        <Input
          type="email"
          placeholder="emailを入力してください"
          {...register('email', {
            required: { value: true, message: '必須項目だよ。' },
          },)}
          errorMessage={errors.email?.message}
        />

        <br /><br />

        <Input
          type="password"
          placeholder="passwordを入力してください"
          {...register('password', {
            required: { value: true, message: '必須項目だよ。' },
          },)}
          errorMessage={errors.password?.message}
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

export default SignIn;
