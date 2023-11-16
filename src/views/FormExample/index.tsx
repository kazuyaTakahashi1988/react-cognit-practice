import React from 'react';
import styled from 'styled-components'
import { useForm } from 'react-hook-form';
import { PropsFormExample } from '../../lib/props';

import SubmitButton from '../../components/Form/SubmitButton';
import Input from '../../components/Form/Input';
import CheckBox from '../../components/Form/CheckBox';
import RadioButton from '../../components/Form/RadioButton';
import Select from '../../components/Form/Select';
import SelectCustom from '../../components/Form/SelectCustom';
import TextArea from '../../components/Form/TextArea';

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
      inputName: '',
      checkBoxName: [],
      radioButtonName: '',
      selectName: '',
      selectCustomName: '',
      textAreaName: '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Styled>
      <form onSubmit={onSubmit}>
        <h1><span>FormExample<br /><small>：react-hook-form</small></span></h1>

        <div className='clm'>
          <Input
            type={undefined}
            label={{text: 'Inputラベルテキスト', required: true}}
            placeholder="入力をお願いします。"
            {...register('inputName', {
              required: { value: true, message: '必須項目だよ。' },
              minLength: { value: 2, message: `2文字以上にしてね` },
              maxLength: { value: 50, message: '最大50文字だよ' },
              // pattern: {
              //   value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/,
              //   message: `英数文字のみにしてね`
              // },
            },)}
            errors={errors}
          />
        </div>

        <div className='clm'>
          <CheckBox
            label={{text: 'CheckBoxラベルテキスト', required: true}}
            options={[
              {value: 'Check_Value_A', label: 'Check_Label_A'},
              {value: 'Check_Value_B', label: 'Check_Label_B'},
              {value: 'Check_Value_C', label: 'Check_Label_C'}
            ]}
            {...register('checkBoxName', {
              required: { value: true, message: '必須項目だよ。' },
              validate: (e: any) => {
                if(e.length < 2 ) return '２つ以上選択してください。';
              },
            },)}
            errors={errors}
          />
        </div>
        
        <div className='clm'>
          <RadioButton
            label={{text: 'RadioButtonラベルテキスト', required: true}}
            options={[
              {value: 'Radio_Value_A', label: 'Radio_Label_A'},
              {value: 'Radio_Value_B', label: 'Radio_Label_B'},
              {value: 'Radio_Value_C', label: 'Radio_Label_C'}
            ]}
            {...register('radioButtonName', {
              required: { value: true, message: '必須項目だよ。' },
            },)}
            errors={errors}
          />
        </div>

        <div className='clm'>
          <Select
            label={{text: 'Selectラベルテキスト', required: true}}
            placeholder={'選択してください'}
            options={[
              {value: 'Select_Value_A', label: 'Select_Label_A'},
              {value: 'Select_Value_B', label: 'Select_Label_B'},
              {value: 'Select_Value_C', label: 'Select_Label_C'}
            ]}
            {...register('selectName', {
              required: { value: true, message: '必須項目だよ。' },
            },)}
            errors={errors}
          />
        </div>

        <div className='clm'>
          <SelectCustom
            label={{text: 'SelectCustomラベルテキスト', required: true}}
            placeholder={'選択してください'}
            options={[
              {value: 'Select_Value_A', label: 'Select_Label_A'},
              {value: 'Select_Value_B', label: 'Select_Label_B'},
              {value: 'Select_Value_C', label: 'Select_Label_C'},
              {value: 'Select_Value_D', label: 'Select_Label_D'},
              {value: 'Select_Value_E', label: 'Select_Label_E'},
              {value: 'Select_Value_F', label: 'Select_Label_F'},
              {value: 'Select_Value_G', label: 'Select_Label_G'}
            ]}
            {...register('selectCustomName', {
              required: { value: true, message: '必須項目だよ。' },
            },)}
            errors={errors}
          />
        </div>

        <div className='clm'>
          <TextArea
            label={{text: 'TextAreaラベルテキスト', required: true}}
            placeholder="入力をお願いします。"
            {...register('textAreaName', {
              required: { value: true, message: '必須項目だよ。' },
              minLength: { value: 2, message: `2文字以上にしてね` },
              maxLength: { value: 50, message: '最大50文字だよ' },
              // pattern: {
              //   value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/,
              //   message: `英数文字のみにしてね`
              // },
            },)}
            errors={errors}
          />
        </div>

        <div className='clm'>
          <SubmitButton>送信</SubmitButton>
          <p className='reset' onClick={() => reset()}>▷ リセット</p>
        </div>
      </form>
    </Styled>
  );
};

const Styled = styled.div`
  padding: 30px;
  max-width: 480px;
  margin: 0 auto;
  .clm{
    margin-top: 30px;
    .reset {
      cursor: pointer;
      text-align: center;
    }
  }
`;

export default FormExample;
