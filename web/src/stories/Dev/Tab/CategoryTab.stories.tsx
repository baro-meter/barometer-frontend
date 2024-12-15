import type { Meta, StoryObj } from "@storybook/react";

import CategoryTab from "@/components/tab/CategoryTab";
import CategoryTabPanel from "@/components/tab/CategoryTabPanel";
import { GoalTypeId } from "@/types/goal";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Dev/Tab",
  component: CategoryTab,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  decorators: [(story) => <div style={{ margin: "3rem" }}>{story()}</div>],
} satisfies Meta<typeof CategoryTab>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const TabList: Story = {
  args: {},
  render: (args) => (
    <CategoryTab>
      <CategoryTabPanel>전체</CategoryTabPanel>
      <CategoryTabPanel typeId={GoalTypeId.OTHER}>기타</CategoryTabPanel>
      <CategoryTabPanel typeId={GoalTypeId.REGULAR_LIFE}>
        규칙적인 생활
      </CategoryTabPanel>
      <CategoryTabPanel typeId={GoalTypeId.PEACE_OF_MIND}>
        마음의 여유
      </CategoryTabPanel>
      <CategoryTabPanel typeId={GoalTypeId.WEIGHT_MANAGEMENT}>
        체중 관리
      </CategoryTabPanel>
    </CategoryTab>
  ),
};
