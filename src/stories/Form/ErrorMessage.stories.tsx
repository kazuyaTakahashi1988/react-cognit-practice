import type { Meta, StoryObj } from "@storybook/react";

import { ErrorMessage } from "../../components/Form/ErrorMessage";

const meta = {
  title: "Form/ErrorMessage",
  component: ErrorMessage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    errorMessage: String,
  },
} satisfies Meta<typeof ErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    errorMessage: "エラーメッセージ",
  },
};
