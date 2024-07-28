import React from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/progress.module.scss";

const cn = classNames.bind(scss);

export interface ProgressProps {
  task: string;
  count: string;
  width: number;
  isActive?: boolean;
  onClick?: () => void;
}

const ProgressView = ({
  task,
  width,
  count,
  isActive,
  onClick,
}: ProgressProps) => {
  return (
    <div
      className={cn("progress", { "is-active": isActive })}
      onClick={onClick}
    >
      <div
        className={cn("progress-bar")}
        role="progressbar"
        aria-valuenow={width}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{ width: `${width}%` }}
      ></div>
      <div className={cn("progress-info")}>
        <strong className={cn("progress-title")}>{task}</strong>
        <span className={cn("progress-count")}>이번 주 {count}</span>
      </div>
    </div>
  );
};

export default ProgressView;
