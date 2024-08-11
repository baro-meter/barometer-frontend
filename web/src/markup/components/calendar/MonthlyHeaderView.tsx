import React from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/calendar.module.scss";
import Image from "next/image";
import IconWeekly from "@images/calendar/icon-weekly.svg";
// import IconToday from "@images/calendar/icon-today.svg";
import { basePath } from "@/../next.config.js";

const cn = classNames.bind(scss);

interface MonthlyHeaderViewProps {
  year: number;
  month: number;
  isToday?: boolean;
  onClickArrow: (type: "next" | "prev") => void;
  onChangeWeeklyView: () => void;
  onClickTodayMoveBtn: () => void;
}

const MonthlyHeaderView = ({
  year,
  month,
  isToday = false,
  onClickArrow,
  onChangeWeeklyView,
  onClickTodayMoveBtn,
}: MonthlyHeaderViewProps) => {
  return (
    <div className={cn("calendar-header")}>
      <div className={cn("inner")}>
        <div className={cn("date-wrapper")}>
          <button
            className={cn("btn-prev")}
            aria-label="이전달"
            onClick={() => onClickArrow("prev")}
          ></button>
          <strong className={cn("date")}>
            <span>{year}</span>.<span>{month}</span>
          </strong>
          <button
            className={cn("btn-next")}
            aria-label="다음달"
            onClick={() => onClickArrow("next")}
          ></button>
        </div>
        {/* TODO 오늘보기 마크업 수정 필요 */}
        {!isToday && (
          <button
            className={cn("btn-calendar-today")}
            aria-label="Today"
            onClick={onClickTodayMoveBtn}
          >
            <Image
              src={`${basePath}/calendar/icon-today.svg`}
              width={20}
              height={20}
              alt={"오늘보기"}
            />
          </button>
        )}
        <button
          className={cn("btn-calendar-view")}
          aria-label="Weekly View"
          onClick={onChangeWeeklyView}
        >
          <Image src={IconWeekly} width={20} height={20} alt={"Weekly 전환"} />
        </button>
      </div>
    </div>
  );
};

export default MonthlyHeaderView;
