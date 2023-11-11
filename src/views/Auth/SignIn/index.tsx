import React from 'react';
import styled from 'styled-components'
import { useForm } from 'react-hook-form';
import { PropsSignIn } from '../../../lib/props';

import { Button } from '../../../components/Form/Button';
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
    <Styled>
      <form onSubmit={onSubmit}>
        <h1>SignIn</h1>
        
        <div className='clm'>
        <Input
          type="email"
          placeholder="emailを入力してください"
          {...register('email', {
            required: { value: true, message: '必須項目だよ。' },
          },)}
          errorMessage={errors.email?.message}
        />
        </div>

        <div className='clm'>
        <Input
          type="password"
          placeholder="passwordを入力してください"
          {...register('password', {
            required: { value: true, message: '必須項目だよ。' },
          },)}
          errorMessage={errors.password?.message}
        />
        </div>

        <div className='clm'>
          <Button><>送信</></Button>
          <p className='reset' onClick={() => reset()}>▷ リセット</p>
        </div>
      </form>
    </Styled>
  );
};

const Styled = styled.div`
  padding: 30px;
  .clm{
    margin-top: 30px;
    .reset {
      cursor: pointer;
      text-align: center;
    }
  }
`;

export default SignIn;
