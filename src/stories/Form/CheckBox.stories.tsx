import type { Meta, StoryObj } from '@storybook/react';
import "../../../.storybook/storybook.css";

import { CheckBox } from '../../components/Form/CheckBox';

const meta = {
  title: 'Form/CheckBox',
  component: CheckBox,
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
} satisfies Meta<typeof CheckBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: {text: 'CheckBoxラベルテキスト', required: false},
    options: [
      {value: 'Check_Value_A', label: 'Check_Label_A'},
      {value: 'Check_Value_B', label: 'Check_Label_B'},
      {value: 'Check_Value_C', label: 'Check_Label_C'}
    ],
    errors: [],
  },
};

export const Required: Story = {
  args: {
    label: {text: 'CheckBoxラベルテキスト', required: true},
    options: [
      {value: 'Check_Value_A', label: 'Check_Label_A'},
      {value: 'Check_Value_B', label: 'Check_Label_B'},
      {value: 'Check_Value_C', label: 'Check_Label_C'}
    ],
    errors: [],
  },
};