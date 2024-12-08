import React from "react";

interface RoundTabListViewProps {
  children: React.ReactNode;
}

const RoundTabListView = ({ children }: RoundTabListViewProps) => {
  return (
    <div
      className="tab-container"
      style={{ display: "flex", position: "relative" }}
    >
      {children}
    </div>
  );
};

interface RoundTabListProps {
  children?: React.ReactNode;
}

export default function RoundTabList({ children }: RoundTabListProps) {
  const viewProps = { children };

  return <RoundTabListView {...viewProps} />;
}
