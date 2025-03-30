import Mission from "@/markup/pages/Mission/Mission";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Markup/Pages/Mission",
  component: Mission,
} satisfies Meta<typeof Mission>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hasMission: false,
  },
};
