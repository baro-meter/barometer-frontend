import CategoryLabel from "@/markup/components/CategoryLabel";
import { GoalTypeId } from "@/types/goal";
import React, { createContext, useState } from "react";

interface CategoryTabViewProps {
  children?: React.ReactNode;
}

const CategoryTabView = ({ children }: CategoryTabViewProps) => {
  // TODO 마크업 필요
  return (
    <div className="tab-container">
      <CategoryLabel />
      {children}
    </div>
  );
};

interface CategoryTabProps {
  children?: React.ReactNode;
}

export default function CategoryTab({ children }: CategoryTabProps) {
  const viewProps = { children };

  const [activeTabTypeId, setActiveTabTypeId] = useState<
    GoalTypeId | undefined
  >();

  return (
    <CategoryTabContext.Provider
      value={{ activeTabTypeId, setActiveTabTypeId }}
    >
      <CategoryTabView {...viewProps} />
    </CategoryTabContext.Provider>
  );
}

interface CategoryTabContextType {
  activeTabTypeId: GoalTypeId | undefined;
  setActiveTabTypeId: (typeId: GoalTypeId | undefined) => void;
}

export const CategoryTabContext = createContext<CategoryTabContextType>({
  activeTabTypeId: undefined,
  setActiveTabTypeId: () => {},
});
