import React, { useState } from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/progress.module.scss";

const cn = classNames.bind(scss);

export interface ProgressProps {
  task: string;
  count: number;
  checkedList: boolean[];
  onClick?: () => void;
  isDone?: boolean;
}

interface ProgressBoxProps {
  isActive?: boolean;
  isDeActive?: boolean;
  onClick: () => void;
}

const ProgressBox = ({ isActive, isDeActive, onClick }: ProgressBoxProps) => {
  return (
    <span
      className={cn("progress-box", {
        "is-active": isActive,
        "is-deactive": isDeActive,
      })}
      onClick={onClick}
    ></span>
  );
};

const ProgressView = ({
  task,
  count,
  checkedList,
  onClick,
  isDone,
}: ProgressProps) => {
  const [activeStates, setActiveStates] = useState<boolean[]>(checkedList);

  const handleBoxClick = (index: number) => {
    const newStates = [...activeStates];
    if (index === 0 || activeStates[index - 1]) {
      newStates[index] = !newStates[index];
      setActiveStates(newStates);
    }
  };

  return (
    <div className={cn("progress-item")}>
      <div className={cn("progress-info")}>
        <strong className={cn("progress-title")}>{task}</strong>
        <span className={cn("progress-count")}>이번 주 {count}일</span>
      </div>
      <div className={cn("progress", { "is-done": isDone })} onClick={onClick}>
        {[...Array(count)].map((_, index) => (
          <ProgressBox
            key={index}
            isActive={activeStates[index]}
            isDeActive={!activeStates[index] && index === 0}
            onClick={() => handleBoxClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressView;
