import React from "react";
import classNames from "classnames/bind";
import scss from "styles/components/calendar.module.scss";
import Image from "next/image";

const cn = classNames.bind(scss);

interface WeeklyHeaderViewProps {
  year: number;
  month: number;
  week: number;
  isToday?: boolean;
  handleChangeMonthlyView: () => void;
}

const WeeklyHeaderView = ({
  year,
  month,
  week,
  isToday = false,
  handleChangeMonthlyView,
}: WeeklyHeaderViewProps) => {
  return (
    <div className={cn("calendar-header")}>
      <div className={cn("inner")}>
        <strong className={cn("date")}>
          <span>{year}</span>년 <span>{month}</span>월 <span>{week}</span>주
        </strong>
        <div className={cn("btn-area")}>
          {!isToday && (
            <button className={cn("btn-calendar-today")} aria-label="Today">
              <Image
                src="/calendar/icon-today.svg"
                width={20}
                height={20}
                alt={"오늘보기"}
              />
            </button>
          )}
          <button
            className={cn("btn-calendar-view")}
            aria-label="Monthly View"
            onClick={handleChangeMonthlyView}
          >
            <Image
              src="/calendar/icon-monthly.svg"
              width={20}
              height={20}
              alt={""}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeeklyHeaderView;
