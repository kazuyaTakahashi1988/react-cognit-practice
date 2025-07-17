import { Button } from "../../components/button/button";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Button/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => alert("Default：onClicked !!"),
    children: "ボタンクリック！",
  },
};

export const Secondary: Story = {
  args: {
    className: "secondary",
    onClick: () => alert("Secondary：onClicked !!"),
    children: "ボタンクリック！",
  },
};

export const Disabled: Story = {
  args: {
    onClick: () => alert("Disabled：onClicked !!"),
    children: "ボタンクリック！",
    disabled: true,
  },
};
