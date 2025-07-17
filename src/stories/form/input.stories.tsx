import { Input } from "../../components/form/input";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Form/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          width: "100vh",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Default：入力をお願いします。",
    label: { text: "Default：Inputラベルテキスト" },
    errorMessage: "",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled：入力をお願いします。",
    label: { text: "Disabled：Inputラベルテキスト" },
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    placeholder: "Required：入力をお願いします。",
    label: { text: "Required：Inputラベルテキスト", required: true },
    errorMessage: "",
  },
};

export const Error: Story = {
  args: {
    placeholder: "Error：入力をお願いします。",
    label: { text: "Error：Inputラベルテキスト", required: true },
    errorMessage: "必須項目だよ。",
  },
};
