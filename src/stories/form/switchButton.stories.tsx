import { SwitchButton } from "../../components/form/switchButton";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Form/SwitchButton",
  component: SwitchButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SwitchButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: { text: "SwitchButtonラベルテキスト" },
    options: [
      {
        value: "Switch_Value_A",
        label: "noActive_A",
        labelActived: "Actived_A",
      },
      {
        value: "Switch_Value_B",
        label: "noActive_B",
        labelActived: "Actived_B",
      },
      { value: "Switch_Value_C", label: "----------" },
    ],
  },
};

export const Required: Story = {
  args: {
    label: { text: "SwitchButtonラベルテキスト", required: true },
    options: [
      {
        value: "Switch_Value_A",
        label: "noActive_A",
        labelActived: "Actived_A",
      },
      {
        value: "Switch_Value_B",
        label: "noActive_B",
        labelActived: "Actived_B",
      },
      { value: "Switch_Value_C", label: "----------" },
    ],
  },
};

export const Error: Story = {
  args: {
    label: { text: "SwitchButtonラベルテキスト", required: true },
    options: [
      {
        value: "Switch_Value_A",
        label: "noActive_A",
        labelActived: "Actived_A",
      },
      {
        value: "Switch_Value_B",
        label: "noActive_B",
        labelActived: "Actived_B",
      },
      { value: "Switch_Value_C", label: "----------" },
    ],
    errorMessage: "必須項目だよ。",
  },
};
