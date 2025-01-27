import type { Meta, StoryObj } from "@storybook/react";
import CategoryLabel from "@/markup/components/CategoryLabel";

const meta = {
  title: "Markup/Components/CategoryLabel",
  component: CategoryLabel,
  tags: ["autodocs"],
} satisfies Meta<typeof CategoryLabel>;

export default meta;
type Story = StoryObj<typeof CategoryLabel>;

const testData = [
  {
    text: "전체",
    order: 0,
  },
  {
    typeId: 1,
    text: "규칙적인 생활",
    order: 1,
  },
  {
    typeId: 2,
    text: "마음의 여유",
    order: 2,
  },
  {
    typeId: 3,
    text: "체중 관리",
    order: 3,
  },
];

export const Default: Story = {
  render: (args) => <CategoryLabel items={testData} />,
  args: {},
};
