import type { Meta, StoryObj } from '@storybook/react';
import "../../App.css";
import "../assets/storybook.css";

import { Button } from '../../components/Button/Button';

const meta = {
  title: 'Button/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: String,
    onClick: Object,
    children: Object,
    isDisable: Boolean,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: '',
    onClick: () => alert('onClicked !!'),
    children: 'ボタンクリック！',
    isDisable: false,
  },
};

export const Secondary: Story = {
  args: {
    type: 'secondary',
    onClick: () => alert('onClicked !!'),
    children: 'ボタンクリック！',
    isDisable: false,
  },
};

export const Disabled: Story = {
  args: {
    type: '',
    onClick: () => alert('onClicked !!'),
    children: 'ボタンクリック！',
    isDisable: true,
  },
};