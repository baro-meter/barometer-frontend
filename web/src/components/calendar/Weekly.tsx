import React from "react";
import classNames from "classnames/bind";
import scss from "styles/components/calendar.module.scss";
import BaroMeterDate from "./BaroMeterDate";

const cn = classNames.bind(scss);

interface WeeklyViewProps {
  weekIdx: number;
  weekDates: number[];
  activeDate?: number; // TODO today일수도 있어서 작업 안함
  handleClickDate: (date: number) => void;
}

const WeeklyView = ({
  weekIdx,
  weekDates,
  activeDate,
  handleClickDate,
}: WeeklyViewProps) => {
  return (
    <div role="row" key={weekIdx} className={cn("row", "calendar-row")}>
      {weekDates.map((d, di) => (
        <BaroMeterDate
          key={weekIdx * 10 + di}
          date={d}
          score={0}
          successGoalCount={0}
          isActive={d === activeDate}
          onClick={() => handleClickDate(d)}
        />
      ))}
    </div>
  );
};

interface WeeklyProps {
  weekIdx?: number;
  weekDates: number[];
  activeDate?: number;
  className?: string;
  onClickDate: (date: number) => void;
}

export default function Weekly({
  weekIdx = 0,
  weekDates,
  activeDate,
  className,
  onClickDate,
}: WeeklyProps) {
  const viewProps = {
    weekIdx,
    weekDates,
    activeDate,
    className,
    handleClickDate: onClickDate,
  };
  return <WeeklyView {...viewProps} />;
}
