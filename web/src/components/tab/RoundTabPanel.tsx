import React from "react";
import { RoundTabContext } from "./RoundTab";

interface RoundTabPanelViewProps {
  children?: React.ReactNode;
}

const RoundTabPanelView = ({ children }: RoundTabPanelViewProps) => {
  return <div>{children}</div>;
};

interface RoundTabPanelProps {
  children?: React.ReactNode;
  index: number; // tabItem의 index 순서 매칭용 (0부터 시작)
}

export default function RoundTabPanel({ children, index }: RoundTabPanelProps) {
  const viewProps = { children };

  return (
    <RoundTabContext.Consumer>
      {({ activeTabIdx }) =>
        activeTabIdx === index && <RoundTabPanelView {...viewProps} />
      }
    </RoundTabContext.Consumer>
  );
}
