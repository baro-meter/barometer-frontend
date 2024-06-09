import type { Meta, StoryObj } from "@storybook/react";
import ProgressListView from "markup/components/ProgressListView";

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
  { task: "일이삼사오육칠팔", width: 70, count: "2번" },
  { task: "걸어서 회사가기", width: 10, count: "매일" },
  { task: "우유 한잔 마시기", width: 100, count: "4번" },
  { task: "근력 운동 하기", width: 20, count: "2번", isActive: true },
  {
    task: "출퇴근할때 계단으로 오르내리기 더써볼까 이거 계속늘어남 이게 맞을까~~~~?",
    width: 90,
    count: "1번",
  },
  { task: "이제 더이상 할게 없는데", width: 80, count: "2번" },
  {
    task: "모름..",
    width: 60,
    count: "2번",
    isActive: true,
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
    progressList,
  },
};
