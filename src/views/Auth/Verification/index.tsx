import React from 'react';
import styled from 'styled-components'
import { useForm } from 'react-hook-form';
import { PropsVerification } from '../../../lib/props';

import { Button } from '../../../components/Form/Button';
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
    <Styled>
      <form onSubmit={onSubmit}>
        <h1>Verification</h1>

        <div className='clm'>
          <Input
            type="password"
            placeholder="verificationCodeを入力してください"
            {...register('verificationCode', {
              required: { value: true, message: '必須項目だよ。' },
            },)}
            errorMessage={errors.verificationCode?.message}
          />
        </div>
        
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

export default Verification;
