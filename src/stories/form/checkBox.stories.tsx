import { CheckBox } from "../../components/form/checkBox";

import type { Meta, StoryObj } from "@storybook/react";

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
    label: { text: "Default：CheckBoxラベルテキスト" },
    options: [
      { value: "Check_Value_A", label: "Check_Label_A" },
      { value: "Check_Value_B", label: "Check_Label_B" },
      { value: "Check_Value_C", label: "Check_Label_C" },
    ],
  },
};

export const Disabled: Story = {
  args: {
    label: { text: "Disabled：CheckBoxラベルテキスト" },
    options: [
      { value: "Check_Value_A", label: "Check_Label_A", disabled: true },
      { value: "Check_Value_B", label: "Check_Label_B", disabled: true },
      { value: "Check_Value_C", label: "Check_Label_C", disabled: true },
    ],
  },
};

export const Required: Story = {
  args: {
    label: { text: "Required：CheckBoxラベルテキスト", required: true },
    options: [
      { value: "Check_Value_A", label: "Check_Label_A" },
      { value: "Check_Value_B", label: "Check_Label_B" },
      { value: "Check_Value_C", label: "Check_Label_C" },
    ],
  },
};

export const Error: Story = {
  args: {
    label: { text: "Error：CheckBoxラベルテキスト", required: true },
    options: [
      { value: "Check_Value_A", label: "Check_Label_A" },
      { value: "Check_Value_B", label: "Check_Label_B" },
      { value: "Check_Value_C", label: "Check_Label_C" },
    ],
    errorMessage: "必須項目だよ。",
  },
};
