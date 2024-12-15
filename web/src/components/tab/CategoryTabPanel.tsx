import React from "react";
import { CategoryTabContext } from "./CategoryTab";

interface CategoryTabPanelViewProps {
  children?: React.ReactNode;
}

const CategoryTabPanelView = ({ children }: CategoryTabPanelViewProps) => {
  return <div>{children}</div>;
};

interface CategoryTabPanelProps {
  children?: React.ReactNode;
  index: number; // tabItem의 index 순서 매칭용 (0부터 시작)
}

export default function CategoryTabPanel({
  children,
  index,
}: CategoryTabPanelProps) {
  const viewProps = { children };

  return (
    <CategoryTabContext.Consumer>
      {({ activeTabIdx }) =>
        activeTabIdx === index && <CategoryTabPanelView {...viewProps} />
      }
    </CategoryTabContext.Consumer>
  );
}
