import React from 'react';
import styled from 'styled-components'
import { useForm } from 'react-hook-form';
import { PropsSignIn } from '../../../lib/props';

import Button from '../../../components/Button/Button';
import Input from '../../../components/Form/Input';

import { SignInHelper } from '../../../utils/Auth';

const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<PropsSignIn>({
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
      <h1>SignIn</h1>
      
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

      <div className='clm button-clm'>
        <Button
          type={'secondary'}
          onClick={() => reset()}
          isDisable={false}
        >
          リセット
        </Button>
        <Button
          type={undefined}
          onClick={() => onSubmit()}
          isDisable={false}
        >
          送信する
        </Button>
      </div>
    </Styled>
  );
};

const Styled = styled.div`
  padding: 30px;
  .clm{
    margin-top: 30px;
    &.button-clm {
      display: flex;
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
`;

export default SignIn;
