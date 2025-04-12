import type { Meta, StoryObj } from "@storybook/react";
import CalendarMonthly from "@/markup/pages/Flow/Tab2_1";

const meta = {
  title: "Markup/Pages/Flow/Tab2_1",
  component: CalendarMonthly,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof CalendarMonthly>;

export default meta;
type Story = StoryObj<typeof CalendarMonthly>;

export const Default: Story = {};
