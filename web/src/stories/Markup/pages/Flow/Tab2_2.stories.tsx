import type { Meta, StoryObj } from "@storybook/react";
import CalendarWeekly from "@/markup/pages/Flow/Tab2_2";

const meta = {
  title: "Markup/Pages/Flow/Tab2_2",
  component: CalendarWeekly,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof CalendarWeekly>;

export default meta;
type Story = StoryObj<typeof CalendarWeekly>;

export const Default: Story = {};
