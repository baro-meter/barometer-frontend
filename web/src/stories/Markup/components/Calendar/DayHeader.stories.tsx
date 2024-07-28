import type { Meta, StoryObj } from "@storybook/react";
import DayHeaderView from "@/markup/components/Calendar/DayHeaderView";

const meta = {
  title: "Markup/Components/Calendar/Common/DayHeader",
  component: DayHeaderView,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof DayHeaderView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
