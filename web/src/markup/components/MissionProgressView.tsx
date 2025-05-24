import React from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/missionProgress.module.scss";

const cn = classNames.bind(scss);

interface MissionProgressViewProps {
  currentDay: number;
  totalDays?: number;
  variant?: "compact" | "large";
  title?: string;
  subtitle?: string;
  showLabels?: boolean;
}

export const MissionProgressView = ({
  currentDay,
  totalDays = 7,
  variant = "compact",
  title = "미션 횟수",
  subtitle = `이번 주 ${currentDay}일`,
  showLabels = true,
}: MissionProgressViewProps) => {
  return (
    <div className={cn("mission-progress-container", variant)}>
      {variant === "compact" && (
        <div className={cn("mission-progress-header")}>
          <span className={cn("title")}>{title}</span>
          <span className={cn("subtitle")}>{subtitle}</span>
        </div>
      )}

      <div className={cn("mission-progress-days")}>
        {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => (
          <div key={day} className={cn("day-item-wrapper")}>
            <div
              className={cn("day-item", {
                active: day <= currentDay,
                inactive: day > currentDay,
              })}
            />
            {showLabels && <span className={cn("day-label")}>{day}</span>}
          </div>
        ))}
      </div>

      {variant === "large" && (
        <div className={cn("mission-progress-footer")}>
          <span className={cn("day-text")}>{currentDay}일</span>
        </div>
      )}
    </div>
  );
};

export default MissionProgressView;
