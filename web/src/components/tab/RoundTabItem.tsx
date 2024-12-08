import React from "react";
import { RoundTabContext } from "./RoundTab";

/**
 * round 형태의 탭을 정의하는 컴포넌트입니다.
 * RoundTabItemPanel과 함께 사용됩니다. (화면 정의시 사용)
 */
interface RoundTabItemViewProps {
  label: string;
  onClick: () => void;
}

const RoundTabItemView = ({ label, onClick }: RoundTabItemViewProps) => {
  // 마크업 수정 필요
  return (
    <div
      onClick={onClick}
      style={{
        background: "black",
        color: "white",
        marginRight: "5px",
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      {label}
    </div>
  );
};

interface RoundTabItemProps {
  label: string;
  index: number;
}

export default function RoundTabItem({ label, index }: RoundTabItemProps) {
  const viewProps = { label };

  return (
    <RoundTabContext.Consumer>
      {({ setActiveTabIdx }) => {
        const handleClick = () => setActiveTabIdx(index);
        return <RoundTabItemView {...viewProps} onClick={handleClick} />;
      }}
    </RoundTabContext.Consumer>
  );
  // return <RoundTabItemView {...viewProps} />;
}
