import React from "react";
import classNames from "classnames/bind";
import scss from "styles/components/progress.module.scss";
import ProgressView, { ProgressProps } from "markup/components/ProgressView";
const cn = classNames.bind(scss);

interface ProgressListView {
  alignment: "vertical" | "horizontal";
  progressList: ProgressProps[];
}

const ProgressListView = ({ alignment, progressList }: ProgressListView) => {
  return (
    <div className={cn("progress-list", `${alignment}`)}>
      {progressList.map((data) => (
        <ProgressView
          task={data.task}
          count={data.count}
          width={data.width}
          isActive={!!data.isActive}
        />
      ))}
    </div>
  );
};

export default ProgressListView;
