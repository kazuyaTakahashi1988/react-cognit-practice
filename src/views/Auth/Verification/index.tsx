import React from 'react';
import styled from 'styled-components'
import { useForm } from 'react-hook-form';
import { PropsVerification } from '../../../lib/props';

import SubmitButton from '../../../components/Form/SubmitButton';
import Input from '../../../components/Form/Input';

import { VerifyHelper } from '../../../utils/Auth';

const Verification: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<PropsVerification>({
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
            label={{text: 'verificationCodeを入力してください', required: true}}
            placeholder="○○○○○○○○"
            {...register('verificationCode', {required: '必須項目だよ。'})}
            errorMessage={errors.verificationCode?.message}
          />
        </div>
        
        <div className='clm'>
          <Input
            type="email"
            label={{text: 'emailを入力してください', required: true}}
            placeholder="○○○○＠○○○○.com"
            {...register('email', {required: '必須項目だよ。'})}
            errorMessage={errors.email?.message}
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

export default Verification;
