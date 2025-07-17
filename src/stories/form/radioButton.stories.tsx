import { RadioButton } from "../../components/form/radioButton";

import type { Meta, StoryObj } from "@storybook/react";

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
    label: { text: "Default：RadioButtonラベルテキスト" },
    options: [
      { value: "Radio_Value_A", label: "Radio_Label_A" },
      { value: "Radio_Value_B", label: "Radio_Label_B" },
      { value: "Radio_Value_C", label: "Radio_Label_C" },
    ],
  },
};

export const Disabled: Story = {
  args: {
    label: { text: "Disabled：RadioButtonラベルテキスト" },
    options: [
      { value: "Radio_Value_A", label: "Radio_Label_A", disabled: true },
      { value: "Radio_Value_B", label: "Radio_Label_B", disabled: true },
      { value: "Radio_Value_C", label: "Radio_Label_C", disabled: true },
    ],
  },
};

export const Required: Story = {
  args: {
    label: { text: "Required：RadioButtonラベルテキスト", required: true },
    options: [
      { value: "Radio_Value_A", label: "Radio_Label_A" },
      { value: "Radio_Value_B", label: "Radio_Label_B" },
      { value: "Radio_Value_C", label: "Radio_Label_C" },
    ],
  },
};

export const Error: Story = {
  args: {
    label: { text: "Error：RadioButtonラベルテキスト", required: true },
    options: [
      { value: "Radio_Value_A", label: "Radio_Label_A" },
      { value: "Radio_Value_B", label: "Radio_Label_B" },
      { value: "Radio_Value_C", label: "Radio_Label_C" },
    ],
    errorMessage: "必須項目だよ。",
  },
};
