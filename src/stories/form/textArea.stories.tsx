import { TextArea } from "../../components/form/textArea";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Form/TextArea",
  component: TextArea,
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
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "入力をお願いします。",
    label: { text: "TextAreaラベルテキスト" },
  },
};

export const Required: Story = {
  args: {
    placeholder: "入力をお願いします。",
    label: { text: "TextAreaラベルテキスト", required: true },
  },
};

export const Error: Story = {
  args: {
    placeholder: "入力をお願いします。",
    label: { text: "TextAreaラベルテキスト", required: true },
    errorMessage: "必須項目だよ。",
  },
};
