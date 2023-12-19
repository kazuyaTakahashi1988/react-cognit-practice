import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "../../components/Form/Input";

const meta = {
  title: "Form/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      text: String,
      required: Boolean,
    },
    errors: Object,
  },
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
    label: { text: "Inputラベルテキスト", required: false },
    errors: [],
  },
};

export const Required: Story = {
  args: {
    placeholder: "入力をお願いします。",
    label: { text: "Inputラベルテキスト", required: true },
    errors: [],
  },
};
