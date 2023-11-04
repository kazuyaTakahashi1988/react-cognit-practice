import React from 'react'
import '../../../App.css'

import Form from "../../../components/form/Form";
import Input from "../../../components/form/Input";

import { SignInHelper } from '../../../utils/auth'

const SignIn: React.FC = () => {
  const onSubmit = (data: any) => {
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
          register={undefined}
          errors={undefined}
        />
        <Input
          type='password'
          name="password"
          register={undefined}
          errors={undefined}
        />
        <button>Submit</button>
      </Form>
    </>
  );
}

export default SignIn
