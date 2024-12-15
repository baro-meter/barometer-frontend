import type { Meta, StoryObj } from "@storybook/react";

import RoundTab from "@/components/tab/RoundTab";
import RoundTabItem from "@/components/tab/RoundTabItem";
import RoundTabList from "@/components/tab/RoundTabList";
import RoundTabPanel from "@/components/tab/RoundTabPanel";
import CategoryLabel from "@/markup/components/CategoryLabelView";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Dev/Tab",
  component: RoundTab,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  decorators: [(story) => <div style={{ margin: "3rem" }}>{story()}</div>],
} satisfies Meta<typeof RoundTab>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const TabList: Story = {
  args: {},
  render: (args) => (
    <RoundTab>
      <CategoryLabel
        categories={[
          { text: "전체", iconType: false },
          { text: "규칙적인 생활", iconType: true },
          { text: "체중관리", iconType: true },
          { text: "마음의 여유", iconType: true },
          { text: "자기 개발", iconType: true },
          { text: "레이블", iconType: true },
          { text: "레이블", iconType: true },
          { text: "레이블", iconType: true },
          { text: "레이블", iconType: true },
        ]}
      />
      {/* <RoundTabList {...args}>
        <RoundTabItem label="tab1" index={0} />
        <RoundTabItem label="tab2" index={1} />
        <RoundTabItem label="tab3" index={2} />
      </RoundTabList> */}
      <RoundTabPanel index={0}>tab panel1</RoundTabPanel>
      <RoundTabPanel index={1}>tab panel2</RoundTabPanel>
      <RoundTabPanel index={2}>tab panel3</RoundTabPanel>
    </RoundTab>
  ),
};
