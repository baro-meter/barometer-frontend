import type { Meta, StoryObj } from "@storybook/react";
import ProgressListView from "markup/components/ProgressListView";

const meta = {
  title: "Markup/Components/ProgressList",
  component: ProgressListView,
  argTypes: {
  },
} satisfies Meta<typeof ProgressListView>;

export default meta;
type Story = StoryObj<typeof ProgressListView>;

export const Vertical: Story = {
  args: {
    alignment: "vertical"
  },
};

export const Horizontal: Story = {
  args: {
    alignment: "horizontal"
  },
};
