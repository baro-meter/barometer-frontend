import type { Meta, StoryObj } from "@storybook/react";
import ProgressListView from "@/markup/components/ProgressListView";

const meta = {
  title: "Markup/Components/ProgressList",
  component: ProgressListView,
  argTypes: {},
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof ProgressListView>;

export default meta;
type Story = StoryObj<typeof ProgressListView>;

const progressList = [
  { task: "일이삼사오육칠팔", count: 5 },
  { task: "걸어서 회사가기", count: 3 },
  { task: "우유 한잔 마시기", count: 5 },
  { task: "근력 운동 하기", count: 4 },
  {
    task: "출퇴근할때 계단으로 오르내리기 더써볼까 이거 계속늘어남 이게 맞을까~~~~?",
    count: 1,
  },
];

export const Vertical: Story = {
  args: {
    alignment: "vertical",
    progressList,
  },
};

export const Horizontal: Story = {
  args: {
    alignment: "horizontal",
    progressList: progressList.slice(0, 4),
  },
};
