import type { Meta, StoryObj } from "@storybook/react";

import { TextArea } from "../../components/Form/TextArea";

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
