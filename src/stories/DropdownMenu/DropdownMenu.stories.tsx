import type { Meta, StoryObj } from "@storybook/react";

import { DropdownMenu } from "../../components/DropdownMenu/DropdownMenu";
import { Button } from "../../components/Button/Button";

const meta = {
  title: "DropdownMenu/DropdownMenu",
  component: DropdownMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          width: "700px",
          height: "170px",
          textAlign: "center",
        }}
      >
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
      { text: "Menu_01", onClick: () => alert("01 onClicked !!") },
      { text: "Menu_02", onClick: () => alert("02 onClicked !!") },
      { text: "Menu_03", onClick: () => alert("03 onClicked !!") },
    ],
    children: "メニューを開くよ！",
  },
};

export const ButtonClick: Story = {
  args: {
    menuList: [
      { text: "Menu_01", onClick: () => alert("01 onClicked !!") },
      { text: "Menu_02", onClick: () => alert("02 onClicked !!") },
      { text: "Menu_03", onClick: () => alert("03 onClicked !!") },
    ],
    children: <Button>メニューを開くよ！</Button>,
  },
};

export const Left: Story = {
  args: {
    menuList: [
      { text: "Menu_01", onClick: () => alert("01 onClicked !!") },
      { text: "Menu_02", onClick: () => alert("02 onClicked !!") },
      { text: "Menu_03", onClick: () => alert("03 onClicked !!") },
    ],
    children: <Button>メニューを開くよ！</Button>,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          textAlign: "left",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const Right: Story = {
  args: {
    menuList: [
      { text: "Menu_01", onClick: () => alert("01 onClicked !!") },
      { text: "Menu_02", onClick: () => alert("02 onClicked !!") },
      { text: "Menu_03", onClick: () => alert("03 onClicked !!") },
    ],
    children: <Button>メニューを開くよ！</Button>,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          textAlign: "right",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const Bottom: Story = {
  args: {
    menuList: [
      { text: "Menu_01", onClick: () => alert("01 onClicked !!") },
      { text: "Menu_02", onClick: () => alert("02 onClicked !!") },
      { text: "Menu_03", onClick: () => alert("03 onClicked !!") },
    ],
    children: <Button>メニューを開くよ！</Button>,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          height: "100%",
        }}
      >
        <Story />
      </div>
    ),
  ],
};
