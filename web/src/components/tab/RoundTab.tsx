import React, { createContext, useState } from "react";

interface RoundTabViewProps {
  children?: React.ReactNode;
}

const RoundTabView = ({ children }: RoundTabViewProps) => {
  // TODO 마크업 필요
  return <div className="tab-container">{children}</div>;
};

interface RoundTabProps {
  children?: React.ReactNode;
}

export default function RoundTab({ children }: RoundTabProps) {
  const viewProps = { children };

  const [activeTabIdx, setActiveTabIdx] = useState<number>(0);

  return (
    <RoundTabContext.Provider value={{ activeTabIdx, setActiveTabIdx }}>
      <RoundTabView {...viewProps} />
    </RoundTabContext.Provider>
  );
}

interface RoundTabContextType {
  activeTabIdx: number;
  setActiveTabIdx: (idx: number) => void;
}

export const RoundTabContext = createContext<RoundTabContextType>({
  activeTabIdx: 0,
  setActiveTabIdx: () => {},
});
