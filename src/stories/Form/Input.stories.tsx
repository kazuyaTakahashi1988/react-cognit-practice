import type { Meta, StoryObj } from '@storybook/react';
import "../../App.css";
import "../assets/storybook.css";

import { Input } from '../../components/Form/Input';

const meta = {
  title: 'Form/Input',
  component: Input,
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
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: '',
    label: {text: 'Inputラベルテキスト', required: false},
    placeholder: '入力をお願いします。',
    errors: undefined,
  },
};

export const Required: Story = {
  args: {
    type: '',
    label: {text: 'Inputラベルテキスト', required: true},
    placeholder: '入力をお願いします。',
    errors: undefined,
  },
};
