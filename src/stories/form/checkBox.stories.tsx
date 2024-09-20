import type { Meta, StoryObj } from "@storybook/react";

import { CheckBox } from "../../components/form/checkBox";

const meta = {
  title: "Form/CheckBox",
  component: CheckBox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CheckBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: { text: "CheckBoxラベルテキスト" },
    options: [
      { value: "Check_Value_A", label: "Check_Label_A" },
      { value: "Check_Value_B", label: "Check_Label_B" },
      { value: "Check_Value_C", label: "Check_Label_C" },
    ],
  },
};

export const Required: Story = {
  args: {
    label: { text: "CheckBoxラベルテキスト", required: true },
    options: [
      { value: "Check_Value_A", label: "Check_Label_A" },
      { value: "Check_Value_B", label: "Check_Label_B" },
      { value: "Check_Value_C", label: "Check_Label_C" },
    ],
  },
};

export const Error: Story = {
  args: {
    label: { text: "CheckBoxラベルテキスト", required: true },
    options: [
      { value: "Check_Value_A", label: "Check_Label_A" },
      { value: "Check_Value_B", label: "Check_Label_B" },
      { value: "Check_Value_C", label: "Check_Label_C" },
    ],
    errorMessage: '必須項目だよ。'
  },
};
