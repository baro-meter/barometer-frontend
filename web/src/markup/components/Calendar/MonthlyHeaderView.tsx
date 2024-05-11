import React from "react";
import classNames from "classnames/bind";
import scss from "styles/components/calendar.module.scss";
import Image from "next/image";

const cn = classNames.bind(scss);

interface MonthlyHeaderViewProps {
  year: number;
  month: number;
  handleArrowClicked: (type: "next" | "prev") => void;
  handleChangeWeeklyView: () => void;
}

const MonthlyHeaderView = ({
  year,
  month,
  handleArrowClicked,
  handleChangeWeeklyView,
}: MonthlyHeaderViewProps) => {
  return (
    <div className={cn("calendar-header")}>
      <div className={cn("inner")}>
        <div className={cn("date-wrapper")}>
          <button
            className={cn("btn-prev")}
            aria-label="이전달"
            onClick={() => handleArrowClicked("prev")}
          ></button>
          <strong className={cn("date")}>
            <span>{year}</span>.<span>{month}</span>
          </strong>
          <button
            className={cn("btn-next")}
            aria-label="다음달"
            onClick={() => handleArrowClicked("next")}
          ></button>
        </div>
        <button
          className={cn("btn-calendar-view")}
          aria-label="Weekly View"
          onClick={handleChangeWeeklyView}
        >
          <Image
            src="/calendar/icon-weekly.svg"
            width={20}
            height={20}
            alt={""}
          />
        </button>
      </div>
    </div>
  );
};

export default MonthlyHeaderView;
