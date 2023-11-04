import React from 'react'
import '../../../App.css'

import Form from "../../../components/form/Form";
import Input from "../../../components/form/Input";

import { VerifyHelper } from '../../../utils/auth'

const Verification: React.FC = () => {
  const onSubmit = (data: any) => {
    console.log(data);
    VerifyHelper(data);
  }

  return (
    <>
      <h1>SignUp</h1>
      <Form onSubmit={onSubmit}>
        <Input
          type='password'
          name="verificationCode"
          register={undefined}
          errors={undefined}
        />
        <Input
          type='email'
          name='email'
          register={undefined}
          errors={undefined}
        />
        <button>Submit</button>
      </Form>
    </>
  );
}

export default Verification
