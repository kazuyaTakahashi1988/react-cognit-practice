import type { Meta, StoryObj } from '@storybook/react';
import "../../App.css";

import { SwitchButton } from '../../components/Form/SwitchButton';

const meta = {
  title: 'Form/SwitchButton',
  component: SwitchButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: String,
    label: {
      text: String,
      required: Boolean
    },
    options: Array<{
      value: String,
      label: String,
      labelActived: String,
    }>,
    errors: Object,
  },
} satisfies Meta<typeof SwitchButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: undefined,
    label: {text: 'SwitchButtonラベルテキスト', required: false},
    options: [
      {value: 'Switch_Value_A', label: 'noActive_A', labelActived: 'Actived_A'},
      {value: 'Switch_Value_B', label: 'noActive_B', labelActived: 'Actived_B'},
      {value: 'Switch_Value_C', label: '----------', labelActived: undefined}
    ],
    errors: undefined,
  },
};

export const Required: Story = {
  args: {
    type: undefined,
    label: {text: 'SwitchButtonラベルテキスト', required: true},
    options: [
      {value: 'Switch_Value_A', label: 'noActive_A', labelActived: 'Actived_A'},
      {value: 'Switch_Value_B', label: 'noActive_B', labelActived: 'Actived_B'},
      {value: 'Switch_Value_C', label: '----------', labelActived: undefined}
    ],
    errors: undefined,
  },
};