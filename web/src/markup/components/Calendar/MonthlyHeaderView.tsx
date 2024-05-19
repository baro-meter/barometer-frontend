import React from "react";
import classNames from "classnames/bind";
import scss from "styles/components/calendar.module.scss";
import Image from "next/image";

const cn = classNames.bind(scss);

interface MonthlyHeaderViewProps {
  year: number;
  month: number;
  isShowMoveTodayBtn: boolean;
  handleArrowClicked: (type: "next" | "prev") => void;
  handleChangeWeeklyView: () => void;
  handleMoveToday: () => void;
}

const MonthlyHeaderView = ({
  year,
  month,
  isShowMoveTodayBtn,
  handleArrowClicked,
  handleChangeWeeklyView,
  handleMoveToday,
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
        {/* TODO 오늘보기 마크업 수정 필요 */}
        {isShowMoveTodayBtn && (
          <button
            className={cn("")}
            style={{ position: "absolute", right: "60px" }}
            aria-label="Today View"
            onClick={handleMoveToday}
          >
            <Image
              src="/calendar/icon-weekly.svg"
              width={20}
              height={20}
              alt={"오늘 보기"}
            />
          </button>
        )}
        <button
          className={cn("btn-calendar-view")}
          aria-label="Weekly View"
          onClick={handleChangeWeeklyView}
        >
          <Image
            src="/calendar/icon-weekly.svg"
            width={20}
            height={20}
            alt={"Weekly 전환"}
          />
        </button>
      </div>
    </div>
  );
};

export default MonthlyHeaderView;
