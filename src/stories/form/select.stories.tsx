import type { Meta, StoryObj } from "@storybook/react";

import { Select } from "../../components/form/select";

const meta = {
  title: "Form/Select",
  component: Select,
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
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "選択してください。",
    label: { text: "Selectラベルテキスト" },
    options: [
      { value: "Select_Value_A", label: "Select_Label_A" },
      { value: "Select_Value_B", label: "Select_Label_B" },
      { value: "Select_Value_C", label: "Select_Label_C" },
    ],
  },
};

export const Required: Story = {
  args: {
    placeholder: "選択してください。",
    label: { text: "Selectラベルテキスト", required: true },
    options: [
      { value: "Select_Value_A", label: "Select_Label_A" },
      { value: "Select_Value_B", label: "Select_Label_B" },
      { value: "Select_Value_C", label: "Select_Label_C" },
    ],
  },
};

export const Error: Story = {
  args: {
    placeholder: "選択してください。",
    label: { text: "Selectラベルテキスト", required: true },
    options: [
      { value: "Select_Value_A", label: "Select_Label_A" },
      { value: "Select_Value_B", label: "Select_Label_B" },
      { value: "Select_Value_C", label: "Select_Label_C" },
    ],
    errorMessage: "必須項目だよ。",
  },
};
