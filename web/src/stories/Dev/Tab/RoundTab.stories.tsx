import type { Meta, StoryObj } from "@storybook/react";

import CategoryTab from "@/components/tab/CategoryTab";
import CategoryTabPanel from "@/components/tab/CategoryTabPanel";
import CategoryLabel from "@/markup/components/CategoryLabel";

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
      <CategoryLabel />
      <CategoryTabPanel index={0}>tab panel1</CategoryTabPanel>
      <CategoryTabPanel index={1}>tab panel2</CategoryTabPanel>
      <CategoryTabPanel index={2}>tab panel3</CategoryTabPanel>
    </CategoryTab>
  ),
};
