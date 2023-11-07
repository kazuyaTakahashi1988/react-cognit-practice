import React from 'react';
import '../../App.css';
import { useForm } from 'react-hook-form';
import { PropsFormExample } from '../../lib/props';

import { Input } from '../../components/form/Input';
import { CheckBox } from '../../components/form/CheckBox';
import { RadioButton } from '../../components/form/RadioButton';
import { Select } from '../../components/form/Select';
import { TextArea } from '../../components/form/TextArea';

const FormExample: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<PropsFormExample>({
    mode: 'onSubmit', // 'onChange' or 'onBlur' or 'onSubmit' or 'onTouched' or 'all'
    reValidateMode: 'onChange', // 'onChange' or 'onBlur' or 'onSubmit'
    criteriaMode: 'all', // 'firstError' or 'all'
    defaultValues: {
      inputValue: '',
      checkBoxValue: [],
      radioButtonValue: '',
      selectValue: '',
      textAreaValue: '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <h1><span>FormExample：react-hook-form</span></h1>
        <Input
          type=""
          placeholder="入力をお願いします。"
          {...register('inputValue', {
            required: { value: true, message: '必須項目だよ。' },
            minLength: { value: 2, message: `2文字以上にしてね` },
            maxLength: { value: 50, message: '最大50文字だよ' },
            // pattern: {
            //   value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/,
            //   message: `英数文字のみにしてね`
            // },
          },)}
          errorMessage={errors.inputValue?.message}
        />

        <br /><br />

        <CheckBox
          options={[
            {value: 'Check_Value_A', label: 'Check_Label_A'},
            {value: 'Check_Value_B', label: 'Check_Label_B'},
            {value: 'Check_Value_C', label: 'Check_Label_C'}
          ]}
          {...register('checkBoxValue', {
            required: { value: true, message: '必須項目だよ。' },
            validate: (e: Array<[]>) => {
              if(e.length < 2 ) return '２つ以上選択してください。';
            },
          },)}
          errorMessage={errors.checkBoxValue?.message}
        />

        <br /><br />
        
        <RadioButton
          options={[
            {value: 'Radio_Value_A', label: 'Radio_Label_A'},
            {value: 'Radio_Value_B', label: 'Radio_Label_B'},
            {value: 'Radio_Value_C', label: 'Radio_Label_C'}
          ]}
          {...register('radioButtonValue', {
            required: { value: true, message: '必須項目だよ。' },
          },)}
          errorMessage={errors.radioButtonValue?.message}
        />

        <br /><br />
        
        <Select
          options={[
            {value: 'Select_Value_A', label: 'Select_Label_A'},
            {value: 'Select_Value_B', label: 'Select_Label_B'},
            {value: 'Select_Value_C', label: 'Select_Label_C'}
          ]}
          placeholder={'選択してください'}
          {...register('selectValue', {
            required: { value: true, message: '必須項目だよ。' },
          },)}
          errorMessage={errors.selectValue?.message}
        />

        <br /><br />
        
        <TextArea
          placeholder="入力をお願いします。"
          {...register('textAreaValue', {
            required: { value: true, message: '必須項目だよ。' },
            minLength: { value: 2, message: `2文字以上にしてね` },
            maxLength: { value: 50, message: '最大50文字だよ' },
            // pattern: {
            //   value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/,
            //   message: `英数文字のみにしてね`
            // },
          },)}
          errorMessage={errors.textAreaValue?.message}
        />

        <br /><br />
        
        <button type="button" onClick={() => reset()}>
          リセット
        </button>
        <button>送信</button>
      </form>
    </>
  );
};

export default FormExample;
