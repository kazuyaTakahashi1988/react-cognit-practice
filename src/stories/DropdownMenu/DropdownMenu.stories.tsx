import type { Meta, StoryObj } from '@storybook/react';
import "../../App.css";

import { DropdownMenu } from '../../components/DropdownMenu/DropdownMenu';
import { Button } from '../../components/Button/Button';

const meta = {
  title: 'DropdownMenu/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    menuList: Array<{
      text: String,
      onClick?: any,
    }>,
    children: Object,
  },
  decorators: [
    (Story) => (
      <div style={{
        width: '100%',
        height: '170px',
        textAlign: 'center',
      }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    menuList: [
      {text: 'Menu_01', onClick: () => alert('01 onClicked !!')},
      {text: 'Menu_02', onClick: () => alert('02 onClicked !!')},
      {text: 'Menu_03', onClick: () => alert('03 onClicked !!')}
    ],
    children: 'メニューを開くよ！',
  },
};

export const ButtonClick: Story = {
  args: {
    menuList: [
      {text: 'Menu_01', onClick: () => alert('01 onClicked !!')},
      {text: 'Menu_02', onClick: () => alert('02 onClicked !!')},
      {text: 'Menu_03', onClick: () => alert('03 onClicked !!')}
    ],
    children: 
      <Button type={undefined} onClick={undefined} isDisable={false}>
        メニューを開くよ！
      </Button>,
  },
};

export const Left: Story = {
  args: {
    menuList: [
      {text: 'Menu_01', onClick: () => alert('01 onClicked !!')},
      {text: 'Menu_02', onClick: () => alert('02 onClicked !!')},
      {text: 'Menu_03', onClick: () => alert('03 onClicked !!')}
    ],
    children: 
      <Button type={undefined} onClick={undefined} isDisable={false}>
        メニューを開くよ！
      </Button>,
  },
  decorators: [
    (Story) => (
      <div style={{
        textAlign: 'left',
      }}>
        <Story />
      </div>
    ),
  ],
};

export const Right: Story = {
  args: {
    menuList: [
      {text: 'Menu_01', onClick: () => alert('01 onClicked !!')},
      {text: 'Menu_02', onClick: () => alert('02 onClicked !!')},
      {text: 'Menu_03', onClick: () => alert('03 onClicked !!')}
    ],
    children: 
      <Button type={undefined} onClick={undefined} isDisable={false}>
        メニューを開くよ！
      </Button>,
  },
  decorators: [
    (Story) => (
      <div style={{
        textAlign: 'right',
      }}>
        <Story />
      </div>
    ),
  ],
};

export const LeftBottom: Story = {
  args: {
    menuList: [
      {text: 'Menu_01', onClick: () => alert('01 onClicked !!')},
      {text: 'Menu_02', onClick: () => alert('02 onClicked !!')},
      {text: 'Menu_03', onClick: () => alert('03 onClicked !!')}
    ],
    children: 
      <Button type={undefined} onClick={undefined} isDisable={false}>
        メニューを開くよ！
      </Button>,
  },
  decorators: [
    (Story) => (
      <div style={{
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'flex-end',
        height: '100%',
      }}>
        <Story />
      </div>
    ),
  ],
};

export const RightBottom: Story = {
  args: {
    menuList: [
      {text: 'Menu_01', onClick: () => alert('01 onClicked !!')},
      {text: 'Menu_02', onClick: () => alert('02 onClicked !!')},
      {text: 'Menu_03', onClick: () => alert('03 onClicked !!')}
    ],
    children: 
      <Button type={undefined} onClick={undefined} isDisable={false}>
        メニューを開くよ！
      </Button>,
  },
  decorators: [
    (Story) => (
      <div style={{
        display: 'flex',
        justifyContent: 'right',
        alignItems: 'flex-end',
        height: '100%',
      }}>
        <Story />
      </div>
    ),
  ],
};