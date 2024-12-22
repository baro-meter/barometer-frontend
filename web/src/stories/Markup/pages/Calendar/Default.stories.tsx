import CalendarMonthly from "@/markup/pages/Calendar/Monthly";
import CalendarWeekly from "@/markup/pages/Calendar/Weekly";
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

export const Weekly: Story = {
  args: {},
  render: () => <CalendarWeekly />,
};
