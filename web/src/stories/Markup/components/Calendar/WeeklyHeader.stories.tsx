import type { Meta, StoryObj } from "@storybook/react";
import WeeklyHeaderView from "@/markup/components/calendar/WeeklyHeaderView";

const meta = {
  title: "Markup/Components/Calendar/Weekly/WeeklyHeader",
  component: WeeklyHeaderView,
  argTypes: {},
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
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
