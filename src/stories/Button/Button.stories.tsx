import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../../components/Button/Button";

const meta = {
  title: "Button/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: Object,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => alert("onClicked !!"),
    children: "ボタンクリック！",
  },
};

export const Secondary: Story = {
  args: {
    className: "secondary",
    onClick: () => alert("onClicked !!"),
    children: "ボタンクリック！",
  },
};

export const Disabled: Story = {
  args: {
    onClick: () => alert("onClicked !!"),
    children: "ボタンクリック！",
    disabled: true,
  },
};
