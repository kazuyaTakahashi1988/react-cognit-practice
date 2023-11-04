import React from 'react'
import '../../../App.css'

import Form from '../../../components/form/Form';
import Input from '../../../components/form/Input';

import { SignInHelper } from '../../../utils/auth'

const SignIn: React.FC = () => {
  const onSubmit = (data: object) => {
    console.log(data);
    SignInHelper(data);
  }

  return (
    <>
      <h1>SignIn</h1>
      <Form onSubmit={onSubmit}>
        <Input
          type='email'
          name='email'
          placeholder='emailを入力してください'
          validations={undefined}
          register={undefined}
          errors={undefined}
        />
        <Input
          type='password'
          name='password'
          placeholder='passwordを入力してください'
          validations={undefined}
          register={undefined}
          errors={undefined}
        />
        <button>Submit</button>
      </Form>
    </>
  );
}

export default SignIn
