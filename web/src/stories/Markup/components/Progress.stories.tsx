import type { Meta, StoryObj } from "@storybook/react";
import ProgressView from "@/markup/components/ProgressView";

const meta = {
  title: "Markup/Components/Progress",
  component: ProgressView,
  argTypes: {},
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof ProgressView>;

export default meta;
type Story = StoryObj<typeof ProgressView>;

export const Default: Story = {
  args: {
    task: "필라테스 수업",
    width: 60,
    count: "매일",
    isActive: false,
  },
};
