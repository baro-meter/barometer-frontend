import type { Meta, StoryObj } from "@storybook/react";

import MonthlyCalendar from "@/components/Calendar/MonthlyCalendar";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Dev/Calendar/MonthlyCalendar",
  component: MonthlyCalendar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // 날짜 필드를 숫자로 변환
    date: {
      control: {
        type: "number",
      },
    },
  },
} satisfies Meta<typeof MonthlyCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    year: 2024,
    month: 1,
    date: 1,
  },
};
