import type { Meta, StoryObj } from '@storybook/react';
import "../../App.css";
import "../assets/storybook.css";

import { Select } from '../../components/Form/Select';

const meta = {
  title: 'Form/Select',
  component: Select,
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
    placeholder: String,
    errors: Object,
  },
  decorators: [
    (Story) => (
      <div style={{
        width: '100vh',
      }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: {text: 'Selectラベルテキスト', required: false},
    options: [
      {value: 'Select_Value_A', label: 'Select_Label_A'},
      {value: 'Select_Value_B', label: 'Select_Label_B'},
      {value: 'Select_Value_C', label: 'Select_Label_C'}
    ],
    placeholder: '選択してください。',
    errors: undefined,
  },
};

export const Required: Story = {
  args: {
    label: {text: 'Selectラベルテキスト', required: true},
    options: [
      {value: 'Select_Value_A', label: 'Select_Label_A'},
      {value: 'Select_Value_B', label: 'Select_Label_B'},
      {value: 'Select_Value_C', label: 'Select_Label_C'}
    ],
    placeholder: '選択してください。',
    errors: undefined,
  },
};