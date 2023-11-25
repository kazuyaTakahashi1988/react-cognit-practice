import type { Meta, StoryObj } from '@storybook/react';
import "../assets/storybook.css";

import { Modal } from '../../components/Modal/Modal';
import { Button } from '../../components/Button/Button';

const meta = {
  title: 'Modal/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: String,
    title: String,
    button: Array<{
      text: String,
      onClick?: any,
    }>,
    children: Object,
  },
  decorators: [
    (Story) => (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vh',
        height: '100vh',
      }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'モーダルテキスト',
    title: 'モーダルタイトル',
    button: {
      text: 'モーダルイベントボタン',
      onClick: () => alert('onClicked !!')
    },
    children: 'モーダルを開くよ！',
  },
};

export const ButtonClick: Story = {
  args: {
    text: 'モーダルテキスト',
    title: 'モーダルタイトル',
    button: {
      text: 'モーダルイベントボタン',
      onClick: () => alert('onClicked !!')
    },
    children: 
      <Button type="" onClick={[]} isDisable={false}>
        モーダルを開くよ！
      </Button>,
  },
};

export const LongText: Story = {
  args: {
    text: 'モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト・モーダルテキスト',
    title: 'モーダルタイトル',
    button: {
      text: 'モーダルイベントボタン',
      onClick: () => alert('onClicked !!')
    },
    children: 
      <Button type="secondary" onClick={[]} isDisable={false}>
        モーダルを開くよ！
      </Button>,
  },
};