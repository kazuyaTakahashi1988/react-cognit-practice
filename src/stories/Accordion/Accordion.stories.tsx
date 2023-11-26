import type { Meta, StoryObj } from '@storybook/react';
import "../../../.storybook/storybook.css";

import { Accordion } from '../../components/Accordion/Accordion';

const meta = {
  title: 'Accordion/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: String,
    children: Object,
    initOpen: Boolean,
  },
  decorators: [
    (Story) => (
      <div style={{
        width: '500px',
      }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'アコーディオンを開くよ！',
    children: 'ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト',
    initOpen: false,
  },
};

export const DefaultOpen: Story = {
  args: {
    title: 'アコーディオンを開くよ！',
    children: 'ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト・ダミーテキスト',
    initOpen: true,
  },
};