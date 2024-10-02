import type { Meta, StoryObj } from "@storybook/react";
import Textarea from "@/markup/components/TextareaView";

const meta = {
  title: "Markup/Components/Textarea",
  component: Textarea,
  argTypes: {},
  tags: ["autodocs"],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: "오늘 내 몸을 어떻게 관리했는지 알려주세요. 자세히 메모할수록 한번에 모아보기 좋아요"
  },
};
