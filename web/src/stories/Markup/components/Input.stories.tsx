import type { Meta, StoryObj } from "@storybook/react";
import Input from "@/markup/components/InputView";

const meta = {
  title: "Markup/Components/Input",
  component: Input,
  argTypes: {},
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    id: "input",
    placeholder: "미션명을 작성해주세요",
    isError: false,
  },
};

export const InputWithLabel: Story = {
  args: {
    label: "이메일",
    id: "input2",
    placeholder: "이메일을 작성해주세요",
    isError: true,
    errorText: "메일 형식으로 작성해주세요 (ex. @barometer.com)"
    
  },
};

