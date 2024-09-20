import type { Meta, StoryObj } from "@storybook/react";

import { RadioButton } from "../../components/form/radioButton";

const meta = {
  title: "Form/RadioButton",
  component: RadioButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: { text: "RadioButtonラベルテキスト" },
    options: [
      { value: "Radio_Value_A", label: "Radio_Label_A" },
      { value: "Radio_Value_B", label: "Radio_Label_B" },
      { value: "Radio_Value_C", label: "Radio_Label_C" },
    ],
  },
};

export const Required: Story = {
  args: {
    label: { text: "RadioButtonラベルテキスト", required: true },
    options: [
      { value: "Radio_Value_A", label: "Radio_Label_A" },
      { value: "Radio_Value_B", label: "Radio_Label_B" },
      { value: "Radio_Value_C", label: "Radio_Label_C" },
    ],
  },
};

export const Error: Story = {
  args: {
    label: { text: "RadioButtonラベルテキスト", required: true },
    options: [
      { value: "Radio_Value_A", label: "Radio_Label_A" },
      { value: "Radio_Value_B", label: "Radio_Label_B" },
      { value: "Radio_Value_C", label: "Radio_Label_C" },
    ],
    errorMessage: '必須項目だよ。',
  },
};
