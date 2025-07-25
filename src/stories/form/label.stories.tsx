import { Label } from "../../components/form/label";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Form/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: {
      text: "ラベルテキスト",
      required: false,
    },
  },
};

export const Required: Story = {
  args: {
    label: {
      text: "ラベルテキスト",
      required: true,
    },
  },
};
