import React from 'react'
import '../../App.css'

import Form from '../../components/form/Form';
import Input from '../../components/form/Input';
import CheckBox from '../../components/form/CheckBox';
import RadioButton from '../../components/form/RadioButton';
import Select from '../../components/form/Select';
import TextArea from '../../components/form/TextArea';

const FormExample: React.FC = () => {
  const onSubmit = (data: object) => console.log(data);

  return (
    <>
      <Form
        onSubmit={onSubmit}
        options={{
          mode: 'onSubmit', // 'onChange' or 'onBlur' or 'onSubmit' or 'onTouched' or 'all'
          reValidateMode: 'onChange', // 'onChange' or 'onBlur' or 'onSubmit'
          criteriaMode: 'all', // 'firstError' or 'all'
          defaultValues: {
            inputNameExample: '',
            checkBoxNameExample: [''],
            radioButtonNameExample: '',
            selectNameExample: '',
            textAreaNameExample: '',
          },
        }}
      >
        <h1><span>FormExample：Smart Form Component</span></h1>
        <Input
          type={''}
          name="inputNameExample"
          placeholder={'入力してください'}
          validations={{
            required: { value: true, message: '必須項目だよ。' },
            minLength: { value: 2, message: `2文字以上にしてね` },
            maxLength: { value: 50, message: '最大50文字だよ' },
            // pattern: {
            //   value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/,
            //   message: `英数文字のみにしてね`
            // },
          }}
          register={undefined}
          errors={undefined}
          data-title="react-hook-form"
        />

        <CheckBox
          name="checkBoxNameExample"
          options={[
            {value: 'Check_Value_A', label: 'Check_Label_A'},
            {value: 'Check_Value_B', label: 'Check_Label_B'},
            {value: 'Check_Value_C', label: 'Check_Label_C'}
          ]}
          validations={{
            required: { value: true, message: '必須項目だよ。' },
            validate: (e: Array<[]>) => {
              return e.length < 2 && '２つ以上選択してください。';
            },
          }}
          register={undefined}
          errors={undefined}
        />

        <RadioButton
          name="radioButtonNameExample"
          options={[
            {value: 'Radio_Value_A', label: 'Radio_Label_A'},
            {value: 'Radio_Value_B', label: 'Radio_Label_B'},
            {value: 'Radio_Value_C', label: 'Radio_Label_C'}
          ]}
          validations={{
            required: { value: true, message: '必須項目だよ。' },
          }}
          register={undefined}
          errors={undefined}
        />

        <Select
          name="selectNameExample"
          options={[
            {value: 'Select_Value_A', label: 'Select_Label_A'},
            {value: 'Select_Value_B', label: 'Select_Label_B'},
            {value: 'Select_Value_C', label: 'Select_Label_C'}
          ]}
          placeholder={'選択してください'}
          validations={{
            required: { value: true, message: '必須項目だよ。' },
          }}
          register={undefined}
          errors={undefined}
        />

        <TextArea
          name="textAreaNameExample"
          placeholder={'入力してください'}
          validations={{
            required: { value: true, message: '必須項目だよ。' },
          }}
          register={undefined}
          errors={undefined}
        />
        <button>Submit</button>
      </Form>
    </>
  );
}

export default FormExample;
