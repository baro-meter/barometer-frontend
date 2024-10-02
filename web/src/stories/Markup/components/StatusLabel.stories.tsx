import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import StatusLabel, { StatusOption } from "@/markup/components/StatusLabelView";

const meta = {
  title: "Markup/Components/StatusLabel",
  component: StatusLabel,
  tags: ["autodocs"],
} satisfies Meta<typeof StatusLabel>;

export default meta;
type Story = StoryObj<typeof StatusLabel>;

export const Default: Story = {
  render: (args) => {
    const [selectedStatus, setSelectedStatus] = useState<number | null>(null);

    const handleStatusChange = (index: number) => {
      setSelectedStatus(index);
    };

    return (
      <StatusLabel
        {...args}
        checkedIndex={selectedStatus ?? 0}
        onChange={handleStatusChange}
      />
    );
  },
  args: {
    options: [
      { status: "excellent", statusText: "완벽했어요" },
      { status: "good", statusText: "적당해요" },
      { status: "insufficient", statusText: "노력했어요" },
      { status: "poor", statusText: "못했어요" },
    ] as StatusOption[],
  },
};
