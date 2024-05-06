import React from "react";
import classNames from "classnames/bind";
import scss from "styles/components/calendar.module.scss";
import Image from "next/image";

const cn = classNames.bind(scss);

interface WeeklyHeaderViewProps {
  year: number;
  month: number;
  week: number;
}

const WeeklyHeaderView = ({ year, month, week }: WeeklyHeaderViewProps) => {
  return (
    <div className={cn("calendar-header")}>
      <div className={cn("inner")}>
        <strong className={cn("date")}>
          <span>{year}</span>년 <span>{month}</span>월 <span>{week}</span>주
        </strong>
        <button className={cn("btn-calendar-view")} aria-label="Monthly View">
          <Image
            src="/calendar/icon-monthly.svg"
            width={20}
            height={20}
            alt={""}
          />
        </button>
      </div>
    </div>
  );
};

export default WeeklyHeaderView;
