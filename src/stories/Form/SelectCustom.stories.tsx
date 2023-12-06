import type { Meta, StoryObj } from "@storybook/react";

import { SelectCustom } from "../../components/Form/SelectCustom";

const meta = {
  title: "Form/SelectCustom",
  component: SelectCustom,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      text: String,
      required: Boolean,
    },
    options: Array<{
      value: string;
      label: string;
    }>,
    placeholder: String,
    errors: Object,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "100vh",
          height: "250px",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SelectCustom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: { text: "SelectCustomラベルテキスト", required: false },
    options: [
      { value: "Select_Value_A", label: "Select_Label_A" },
      { value: "Select_Value_B", label: "Select_Label_B" },
      { value: "Select_Value_C", label: "Select_Label_C" },
      { value: "Select_Value_D", label: "Select_Label_D" },
      { value: "Select_Value_E", label: "Select_Label_E" },
      { value: "Select_Value_F", label: "Select_Label_F" },
      { value: "Select_Value_G", label: "Select_Label_G" },
    ],
    placeholder: "選択してください。",
    errors: [],
  },
};

export const Required: Story = {
  args: {
    label: { text: "SelectCustomラベルテキスト", required: true },
    options: [
      { value: "Select_Value_A", label: "Select_Label_A" },
      { value: "Select_Value_B", label: "Select_Label_B" },
      { value: "Select_Value_C", label: "Select_Label_C" },
      { value: "Select_Value_D", label: "Select_Label_D" },
      { value: "Select_Value_E", label: "Select_Label_E" },
      { value: "Select_Value_F", label: "Select_Label_F" },
      { value: "Select_Value_G", label: "Select_Label_G" },
    ],
    placeholder: "選択してください。",
    errors: [],
  },
};
