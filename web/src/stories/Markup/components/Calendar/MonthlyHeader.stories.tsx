import type { Meta, StoryObj } from "@storybook/react";
import MonthlyHeaderView from "markup/components/Calendar/MonthlyHeaderView";

const meta = {
  title: "Markup/Components/Calendar/Monthly/MonthlyHeader",
  component: MonthlyHeaderView,
  argTypes: {},
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof MonthlyHeaderView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    year: 2024,
    month: 4,
    isShowMoveTodayBtn: false,
  },
};
