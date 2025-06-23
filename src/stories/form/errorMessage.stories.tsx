import { ErrorMessage } from "../../components/form/errorMessage";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Form/ErrorMessage",
  component: ErrorMessage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    errorMessage: "エラーメッセージ",
  },
};
