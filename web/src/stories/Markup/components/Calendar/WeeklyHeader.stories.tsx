import type { Meta, StoryObj } from "@storybook/react";
import WeeklyHeaderView from "markup/components/Calendar/WeeklyHeaderView";

const meta = {
  title: "Markup/Components/Calendar/Weekly/WeeklyHeader",
  component: WeeklyHeaderView,
  argTypes: {},
} satisfies Meta<typeof WeeklyHeaderView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    year: 2024,
    month: 4,
    week: 3,
  },
};
