import React from 'react';
import styled from 'styled-components'
import { useForm } from 'react-hook-form';
import { PropsSignUp } from '../../../lib/props';

import SubmitButton from '../../../components/Form/SubmitButton';
import Input from '../../../components/Form/Input';

import { SignUpHelper } from '../../../utils/Auth';

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<PropsSignUp>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    SignUpHelper(data);
  });

  return (
    <Styled>
      <form onSubmit={onSubmit}>
        <h1>SignUp</h1>

        <div className='clm'>
          <Input
            type="email"
            label={{text: 'emailを入力してください', required: true}}
            placeholder="○○○○＠○○○○.com"
            {...register('email', {required: '必須項目だよ。'})}
            errors={errors}
          />
        </div>

        <div className='clm'>
          <Input
            type="password"
            label={{text: 'passwordを入力してください', required: true}}
            placeholder="○○○○○○○○"
            {...register('password', {required: '必須項目だよ。'})}
            errors={errors}
          />
        </div>

        <div className='clm'>
          <SubmitButton>送信</SubmitButton>
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

export default SignUp;
