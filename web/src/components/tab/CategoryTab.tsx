import React, { createContext, useState } from "react";

interface CategoryTabViewProps {
  children?: React.ReactNode;
}

const CategoryTabView = ({ children }: CategoryTabViewProps) => {
  // TODO 마크업 필요
  return <div className="tab-container">{children}</div>;
};

interface CategoryTabProps {
  children?: React.ReactNode;
}

export default function CategoryTab({ children }: CategoryTabProps) {
  const viewProps = { children };

  const [activeTabIdx, setActiveTabIdx] = useState<number>(0);

  return (
    <CategoryTabContext.Provider value={{ activeTabIdx, setActiveTabIdx }}>
      <CategoryTabView {...viewProps} />
    </CategoryTabContext.Provider>
  );
}

interface CategoryTabContextType {
  activeTabIdx: number;
  setActiveTabIdx: (idx: number) => void;
}

export const CategoryTabContext = createContext<CategoryTabContextType>({
  activeTabIdx: 0,
  setActiveTabIdx: () => {},
});
