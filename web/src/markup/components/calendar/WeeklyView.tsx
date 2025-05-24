import React from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/calendar.module.scss";
import BaroMeterDate, { succesGoalCountType } from "./BaroMeterDateView";

const cn = classNames.bind(scss);

export interface DateDataItem {
  date: number;
  score: 0 | 1 | 2 | 3 | 4;
  successGoalCount: succesGoalCountType;
}

interface WeeklyViewProps {
  weekIdx: number;
  weekDates: number[];
  activeDate?: number;
  activeDates?: number[]; // 여러 날짜를 활성화하기 위한 배열
  dateData?: DateDataItem[];
  allActive?: boolean; // 모든 날짜를 활성화하기 위한 옵션
}

const WeeklyView = ({
  weekIdx,
  weekDates,
  activeDate,
  activeDates = [],
  dateData = [],
  allActive = false,
}: WeeklyViewProps) => {
  return (
    <div role="row" key={weekIdx} className={cn("row", "calendar-row")}>
      {weekDates.map((d, di) => {
        const dateInfo = dateData.find((item) => item.date === d) || {
          date: d,
          score: 0,
          successGoalCount: 0,
        };

        // 1. activeDate와 일치하는 경우에는 항상 활성화(기존 기능 유지)
        // 2. activeDates에 포함된 경우에도 항상 활성화
        // 3. allActive가 true이고 score가 0이 아닌 경우에만 활성화
        const isDateActive =
          d === activeDate ||
          activeDates.includes(d) ||
          (allActive && dateInfo.score !== 0);

        return (
          <BaroMeterDate
            key={weekIdx * 10 + di}
            date={d}
            score={dateInfo.score}
            successGoalCount={dateInfo.successGoalCount}
            isActive={isDateActive}
          />
        );
      })}
    </div>
  );
};

interface WeeklyProps {
  weekIdx?: number;
  weekDates: number[];
  activeDate?: number;
  activeDates?: number[];
  dateData?: DateDataItem[];
  allActive?: boolean;
}

export default function Weekly({
  weekIdx = 0,
  weekDates,
  activeDate,
  activeDates,
  dateData,
  allActive = false,
}: WeeklyProps) {
  const viewProps = {
    weekIdx,
    weekDates,
    activeDate,
    activeDates,
    dateData,
    allActive,
  };
  return <WeeklyView {...viewProps} />;
}
