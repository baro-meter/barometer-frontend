import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/missionProgress.module.scss";
import { MissionProgressType, MISSION_COLOR_KEYS } from "@/types/mission";
import { getColorValue } from "@/utils/colors";
import { Color } from "@/types/color";

const cn = classNames.bind(scss);

// 요일 레이블 배열
const WEEKDAY_LABELS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

interface MissionProgressViewProps {
  currentDay: number;
  variant?: "default" | "large";
  title?: string;
  subtitle?: string;
  showLabels?: boolean;
  missionType?: MissionProgressType;
  onDayClick?: (day: number, selectedDays: number[]) => void;
  onCurrentDayChange?: (day: number) => void;
}

export const MissionProgressView = ({
  currentDay: initialCurrentDay,
  variant = "default",
  title = "미션 횟수",
  subtitle,
  showLabels = true,
  missionType = "routine",
  onDayClick,
  onCurrentDayChange,
}: MissionProgressViewProps) => {
  // 항상 7일로 고정
  const totalDays = 7;

  const [currentDay, setCurrentDay] = useState(Math.max(initialCurrentDay, 1));

  const [selectedDays, setSelectedDays] = useState<number[]>(
    initialCurrentDay > 0
      ? Array.from({ length: initialCurrentDay }, (_, i) => i + 1)
      : [1]
  );

  const defaultSubtitle = `이번 주 ${currentDay}일`;
  const displaySubtitle = subtitle || defaultSubtitle;

  // 미션 타입에 따른 색상
  const colorKey = MISSION_COLOR_KEYS[missionType] as Color;
  const missionColor = getColorValue(colorKey);

  useEffect(() => {
    const newCurrentDay = Math.max(selectedDays.length, 1);

    setCurrentDay(newCurrentDay);

    if (onCurrentDayChange) {
      onCurrentDayChange(newCurrentDay);
    }
  }, [selectedDays, onCurrentDayChange]);

  // 요일 클릭 핸들러
  const handleDayClick = (day: number) => {
    const isAlreadySelected = selectedDays.includes(day);
    let newSelectedDays: number[];

    if (isAlreadySelected) {
      // 마지막 하나 남은 요일은 선택 해제할 수 없음 (최소 1일 유지)
      if (selectedDays.length <= 1) {
        return;
      }
      newSelectedDays = selectedDays.filter((d) => d !== day);
    } else {
      newSelectedDays = [...selectedDays, day];
    }

    setSelectedDays(newSelectedDays);

    if (onDayClick) {
      onDayClick(day, newSelectedDays);
    }
  };

  return (
    <div className={cn("mission-progress", variant)}>
      {variant === "default" && (
        <div className={cn("mission-progress-header")}>
          <span className={cn("title")}>{title}</span>
          <span className={cn("subtitle")}>{displaySubtitle}</span>
        </div>
      )}

      <div className={cn("mission-progress-days")}>
        {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => (
          <div
            key={day}
            className={cn("day-item-wrapper")}
            onClick={() => handleDayClick(day)}
          >
            {showLabels && (
              <span className={cn("day-label")}>{WEEKDAY_LABELS[day - 1]}</span>
            )}
            <div
              className={cn("day-item", {
                active: selectedDays.includes(day),
              })}
              style={
                selectedDays.includes(day)
                  ? { backgroundColor: missionColor }
                  : undefined
              }
            />
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
