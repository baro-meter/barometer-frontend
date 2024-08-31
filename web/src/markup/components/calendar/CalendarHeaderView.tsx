import React from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/calendar.module.scss";
import Image from "next/image";
import { basePath } from "next.config";

interface CalendarHeaderViewProps {
  type: "monthly" | "weekly";
  year: number;
  month: number;
  isToday?: boolean;
  onToggleCalendarType: () => void;
  onClickTodayMoveBtn: () => void;
}

const cn = classNames.bind(scss);

/**
 * 24.08.31 변경사항
 * 기존 Monthly / Weekly Header가 나눠져있던 영역이 하나로 통일됨
 * - 날짜 표현 영역 및 위치가 변동이 없어보여서 합쳤습니다.
 *
 * TODO
 * - 기존 MonthlyHeaderView 컴포넌트 기준으로 마크업 잡고 + 기능 코드 옮겨왔습니다. 변경된 UI에 맞게 마크업 수정해주시면 될 것 같아요~!
 *    - 날짜 옆 화살표 누락되어있습니다. 마크업 추가 해주세용
 * - 날짜 영역 누르면 어떤 이벤트 발생되는지 기획 문의 필요 + 화면 구현 필요
 * - Weekly View에는 오늘보기 기능이 없는건지 기획 문의 필요
 */
const CalendarHeaderView = ({
  type,
  year,
  month,
  isToday = false,
  onToggleCalendarType,
  onClickTodayMoveBtn,
}: CalendarHeaderViewProps) => {
  return (
    <div className={cn("calendar-header")}>
      <div className={cn("inner")}>
        <div className={cn("date-wrapper")}>
          <strong className={cn("date")}>
            <span>{year}</span>.<span>{month}</span>
          </strong>
        </div>
        {type === "weekly" ? (
          <button
            className={cn("btn-calendar-view")}
            aria-label="Monthly View"
            onClick={onToggleCalendarType}
          >
            <Image
              src={`${basePath}/calendar/icon-monthly.svg`}
              width={20}
              height={20}
              alt={""}
            />
          </button>
        ) : (
          <>
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
              onClick={onToggleCalendarType}
            >
              <Image
                src={`${basePath}/calendar/icon-weekly.svg`}
                width={20}
                height={20}
                alt={"Weekly 전환"}
              />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CalendarHeaderView;
