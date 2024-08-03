import React from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/progress.module.scss";
import ProgressView, { ProgressProps } from "@/markup/components/ProgressView";
const cn = classNames.bind(scss);

interface ProgressListView {
  alignment: "vertical" | "horizontal";
  progressList: ProgressProps[];
  onActiveProgress?: (item: ProgressProps) => void;
}

const ProgressListView = ({
  alignment,
  progressList,
  onActiveProgress,
}: ProgressListView) => {
  return (
    <div className={cn("progress-list", `${alignment}`)}>
      {progressList.map((data, i) => (
        <ProgressView
          key={i}
          task={data.task}
          count={data.count}
          width={data.width}
          isActive={!!data.isActive}
          onClick={() => {
            if (onActiveProgress) {
              onActiveProgress(data);
            }
          }}
        />
      ))}
    </div>
  );
};

export default ProgressListView;
