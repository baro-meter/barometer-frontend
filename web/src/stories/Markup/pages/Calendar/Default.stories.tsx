import CalendarMonthly from "@/markup/pages/Calendar/Monthly";
import CalendarMonthlyMission from "@/markup/pages/Calendar/MonthlyMission";
import CalendarWeekly from "@/markup/pages/Calendar/Weekly";
import CalendarWeeklyMission from "@/markup/pages/Calendar/WeeklyMission";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Markup/Pages/Calendar",
  component: CalendarMonthly,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof CalendarMonthly>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Monthly: Story = {
  args: {},
};

export const MonthlyMission: Story = {
  args: {},
  render: () => <CalendarMonthlyMission />,
};

export const Weekly: Story = {
  args: {},
  render: () => <CalendarWeekly />,
};

export const WeeklyMission: Story = {
  args: {},
  render: () => <CalendarWeeklyMission />,
};
