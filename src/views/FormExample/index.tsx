import React from 'react'
import '../../App.css'

import Form from '../../components/form/Form';
import Input from '../../components/form/Input';
import CheckBox from '../../components/form/CheckBox';
import RadioButton from '../../components/form/RadioButton';
import Select from '../../components/form/Select';
import TextArea from '../../components/form/TextArea';

const FormExample: React.FC = () => {
  const onSubmit = (data: Object) => console.log(data);

  return (
    <>
      <h1>FormExample：Smart Form Component</h1>
      <Form onSubmit={onSubmit}>
        <Input
          type={''}
          name="inputNameExample"
          register={undefined}
          errors={undefined}
          validations={{
            required: { value: true, message: '必須項目です。' },
            maxLength: { value: 50, message: '最大50文字です' },
            minLength: { value: 2, message: `2文字以上にしてね` },
            pattern: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/,
          }}
        />

        <CheckBox
          name="checkBoxNameExample"
          options={[
            {value: 'Check_Value_A', label: 'Check_Label_A'},
            {value: 'Check_Value_B', label: 'Check_Label_B'},
            {value: 'Check_Value_C', label: 'Check_Label_C'}
          ]}
          register={undefined}
          errors={undefined}
          validations={{
            required: { value: true, message: '必須項目です。' },
          }}
        />

        <RadioButton
          name="radioButtonNameExample"
          options={[
            {value: 'Radio_Value_A', label: 'Radio_Label_A'},
            {value: 'Radio_Value_B', label: 'Radio_Label_B'},
            {value: 'Radio_Value_C', label: 'Radio_Label_C'}
          ]}
          register={undefined}
          errors={undefined}
          validations={{
            required: { value: true, message: '必須項目です。' },
          }}
        />

        <Select
          name="selectNameExample"
          options={[
            {value: 'Select_Value_A', label: 'Select_Label_A'},
            {value: 'Select_Value_B', label: 'Select_Label_B'},
            {value: 'Select_Value_C', label: 'Select_Label_C'}
          ]}
          placeholder={'選択してください'}
          register={undefined}
          errors={undefined}
          validations={{
            required: { value: true, message: '必須項目です。' },
          }}
        />

        <TextArea
          name="textAreaNameExample"
          register={undefined}
          errors={undefined}
          validations={{
            required: { value: true, message: '必須項目です。' },
          }}
        />
        <button>Submit</button>
      </Form>
    </>
  );
}

export default FormExample;
