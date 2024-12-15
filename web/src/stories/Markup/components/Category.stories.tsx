import type { Meta, StoryObj } from "@storybook/react";
import CategoryLabel from "@/markup/components/CategoryLabel";

const meta = {
  title: "Markup/Components/CategoryLabel",
  component: CategoryLabel,
  tags: ["autodocs"],
} satisfies Meta<typeof CategoryLabel>;

export default meta;
type Story = StoryObj<typeof CategoryLabel>;

export const Default: Story = {
  render: (args) => <CategoryLabel />,
  args: {},
};
