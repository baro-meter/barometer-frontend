import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import CategoryLabel from "@/markup/components/CategoryLabelView";

const meta = {
  title: "Markup/Components/CategoryLabel",
  component: CategoryLabel,
  tags: ["autodocs"],
} satisfies Meta<typeof CategoryLabel>;

export default meta;
type Story = StoryObj<typeof CategoryLabel>;

export const Default: Story = {
  render: (args) => {
    const [categories, setCategories] = useState(args.categories);

    const handleChange = (id: string) => {
      setCategories(categories.map((category, index) => 
        ({ ...category, checked: `category${index}` === id })
      ));
    };

    const updatedArgs = {
      ...args,
      categories: categories.map((category, index) => ({
        ...category,
        id: `category${index}`
      })),
    };

    return <CategoryLabel {...updatedArgs} onChange={handleChange} />;
  },
  args: {
    categories: [
      { text: "전체", checked: true, iconType: false },
      { text: "규칙적인 생활", checked: false, iconType: true },
      { text: "체중관리", checked: false, iconType: true },
      { text: "마음의 여유", checked: false, iconType: true },
      { text: "자기 개발", checked: false, iconType: true },
      { text: "레이블", checked: false, iconType: true },
      { text: "레이블", checked: false, iconType: true },
      { text: "레이블", checked: false, iconType: true },
      { text: "레이블", checked: false, iconType: true },
    ],
  },
};
