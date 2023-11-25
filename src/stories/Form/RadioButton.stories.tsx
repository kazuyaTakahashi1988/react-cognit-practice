import type { Meta, StoryObj } from '@storybook/react';
import "../../App.css";
import "../assets/storybook.css";

import { RadioButton } from '../../components/Form/RadioButton';

const meta = {
  title: 'Form/RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      text: String,
      required: Boolean
    },
    options: Array<{
      value: String,
      label: String,
    }>,
    errors: Object,
  },
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: {text: 'RadioButtonラベルテキスト', required: false},
    options: [
      {value: 'Radio_Value_A', label: 'Radio_Label_A'},
      {value: 'Radio_Value_B', label: 'Radio_Label_B'},
      {value: 'Radio_Value_C', label: 'Radio_Label_C'}
    ],
    errors: undefined,
  },
};

export const Required: Story = {
  args: {
    label: {text: 'RadioButtonラベルテキスト', required: true},
    options: [
      {value: 'Radio_Value_A', label: 'Radio_Label_A'},
      {value: 'Radio_Value_B', label: 'Radio_Label_B'},
      {value: 'Radio_Value_C', label: 'Radio_Label_C'}
    ],
    errors: undefined,
  },
};