import type { Meta, StoryObj } from "@storybook/react";
import MonthlyHeaderView from "@/markup/components/calendar/MonthlyHeaderView";
import { Component } from "react";

const meta = {
  title: "Markup/Components/Calendar/Monthly/MonthlyHeader",
  component: MonthlyHeaderView,
  argTypes: {},
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "⚠️ [deprecated] CalendarHeaderView로 통합되었습니다.",
      },
    },
  },
} satisfies Meta<typeof MonthlyHeaderView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    year: 2024,
    month: 4,
  },
};
