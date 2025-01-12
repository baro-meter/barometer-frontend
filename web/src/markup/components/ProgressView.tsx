import React, { useState } from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/progress.module.scss";
import { GoalType } from "@/types/goal";

const cn = classNames.bind(scss);

// TODO 일괄 바뀔 예정 -> goalType을 품고 있는 형태로(DB 데이터 활용)
export interface ProgressProps {
  task: string; // 삭제 예정
  count: number; // 삭제 예정
  goal?: GoalType; // new TODO (optional -> 필수로 변경)
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

const ProgressView = ({ task, count, onClick, isDone }: ProgressProps) => {
  const [activeStates, setActiveStates] = useState<boolean[]>(
    Array(count).fill(false)
  );

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
