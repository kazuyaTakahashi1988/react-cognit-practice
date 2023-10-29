
import React from 'react'
import { Form, Input, Select, CheckBox } from "../../../components/form02/Form";

const About: React.FC = () => {
  const onSubmit = (data: Object) => console.log(data);

  return (
    <>
      <h1>Smart Form Component</h1>
      <Form onSubmit={onSubmit}>
        <Input name="firstName" />
        <CheckBox name="lastName" options={[
          'A01',
          'A02',
          'A03',
        ]} />
        <Select name="sex" options={["female", "male"]} />

        <button>Submit</button>
      </Form>
    </>
  );
}

export default About;
