import React from 'react';
import styled from 'styled-components'
import { useForm } from 'react-hook-form';
import { PropsFormExample } from '../../lib/props';

import { Button } from '../../components/Form/Button';
import { Input } from '../../components/Form/Input';
import { CheckBox } from '../../components/Form/CheckBox';
import { RadioButton } from '../../components/Form/RadioButton';
import { Select } from '../../components/Form/Select';
import { TextArea } from '../../components/Form/TextArea';

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
    <Styled>
      <form onSubmit={onSubmit}>
        <h1><span>FormExample：react-hook-form</span></h1>

        <div className='clm'>
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
        </div>

        <div className='clm'>
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
        </div>
        
        <div className='clm'>
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
        </div>

        <div className='clm'>
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
        </div>

        <div className='clm'>
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
        </div>

        <div className='clm'>
          <Button><>送信</></Button>
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

export default FormExample;
