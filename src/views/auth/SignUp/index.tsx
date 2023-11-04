import React from 'react'
import '../../../App.css'

import Form from '../../../components/form/Form';
import Input from '../../../components/form/Input';

import { SignUpHelper } from '../../../utils/auth'

const SignUp: React.FC = () => {
  const onSubmit = (data: object) => {
    console.log(data);
    SignUpHelper(data);
  }

  return (
    <>
      <h1>SignUp</h1>
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

export default SignUp
