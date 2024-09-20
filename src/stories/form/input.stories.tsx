import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "../../components/form/input";

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
    placeholder: "入力をお願いします。",
    label: { text: "Inputラベルテキスト" },
    errorMessage: '',
  },
};

export const Required: Story = {
  args: {
    placeholder: "入力をお願いします。",
    label: { text: "Inputラベルテキスト", required: true },
    errorMessage: '',
  },
};

export const Error: Story = {
  args: {
    placeholder: "入力をお願いします。",
    label: { text: "Inputラベルテキスト", required: true },
    errorMessage: '必須項目だよ。',
  },
};
