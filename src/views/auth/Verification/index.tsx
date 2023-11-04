import React from 'react'
import '../../../App.css'

import Form from '../../../components/form/Form';
import Input from '../../../components/form/Input';

import { VerifyHelper } from '../../../utils/auth'

const Verification: React.FC = () => {
  const onSubmit = (data: object) => {
    console.log(data);
    VerifyHelper(data);
  }

  return (
    <>
      <h1>Verification</h1>
      <Form onSubmit={onSubmit}>
        <Input
          type='password'
          name='verificationCode'
          placeholder='verificationCodeを入力してください'
          validations={undefined}
          register={undefined}
          errors={undefined}
        />
        <Input
          type='email'
          name='email'
          placeholder='emailを入力してください'
          validations={undefined}
          register={undefined}
          errors={undefined}
        />
        <button>Submit</button>
      </Form>
    </>
  );
}

export default Verification
