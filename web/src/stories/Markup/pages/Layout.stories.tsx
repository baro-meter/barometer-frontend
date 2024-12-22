import Layout from "@/markup/pages/Layout";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Markup/Pages/Layout",
  component: Layout,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
