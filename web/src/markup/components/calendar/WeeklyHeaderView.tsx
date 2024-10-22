import React from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/calendar.module.scss";
import Image from "next/image";
import { basePath } from "next.config";

const cn = classNames.bind(scss);

/**
 * deprecated
 * - UI 변동이 있을 수도 있을 것 같아 일단 파일만 남겨둠
 */
interface WeeklyHeaderViewProps {
  year: number;
  month: number;
  week: number;
  isToday?: boolean;
  onChangeMonthlyView: () => void;
  onClickTodayMoveBtn: () => void;
}

const WeeklyHeaderView = ({
  year,
  month,
  week,
  isToday = false,
  onChangeMonthlyView,
  onClickTodayMoveBtn,
}: WeeklyHeaderViewProps) => {
  return (
    <div className={cn("calendar-header")}>
      <div className={cn("inner")}>
        <strong className={cn("date")}>
          <span>{year}</span>년 <span>{month}</span>월 <span>{week}</span>주
        </strong>
        <div className={cn("btn-area")}>
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
            aria-label="Monthly View"
            onClick={onChangeMonthlyView}
          >
            <Image
              src={`${basePath}/calendar/icon-monthly.svg`}
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
