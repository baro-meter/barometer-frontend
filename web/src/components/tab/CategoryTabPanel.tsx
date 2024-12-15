import React from "react";
import { CategoryTabContext } from "./CategoryTab";
import { GoalTypeId } from "@/types/goal";

interface CategoryTabPanelViewProps {
  children?: React.ReactNode;
}

const CategoryTabPanelView = ({ children }: CategoryTabPanelViewProps) => {
  return <div>{children}</div>;
};

interface CategoryTabPanelProps {
  children?: React.ReactNode;
  typeId?: GoalTypeId; // undefined = 전체
}

export default function CategoryTabPanel({
  children,
  typeId,
}: CategoryTabPanelProps) {
  const viewProps = { children };

  return (
    <CategoryTabContext.Consumer>
      {({ activeTabTypeId }) =>
        activeTabTypeId === typeId && <CategoryTabPanelView {...viewProps} />
      }
    </CategoryTabContext.Consumer>
  );
}
