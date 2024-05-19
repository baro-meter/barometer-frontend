import type { Meta, StoryObj } from "@storybook/react";
import MonthlyCalendarView from "markup/components/Calendar/MonthlyCalendarView";

const meta = {
  title: "Markup/Components/Calendar/Monthly/MonthlyCalendar",
  component: MonthlyCalendarView,
} satisfies Meta<typeof MonthlyCalendarView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    year: 2024,
    month: 12,
    date: 30
  }
};
