import React from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/calendar.module.scss";
import BaroMeterDate from "./BaroMeterDate";
import { selectedTabState } from "@/recoils/tab";
import { useRecoilValue } from "recoil";
import { TabEnum } from "@/types/tab";

const cn = classNames.bind(scss);

/**
 * 2024.10.26 기준 마크업 컴포넌트 코드로 업데이트 완료
 */
interface WeeklyViewProps {
  weekIdx: number;
  weekDates: number[];
  selectedViewType: TabEnum;
  today?: number;
  handleClickDate: (date: number) => void;
}

const WeeklyView = ({
  weekIdx,
  weekDates,
  selectedViewType,
  today,
  handleClickDate,
}: WeeklyViewProps) => {
  return (
    <div role="row" key={weekIdx} className={cn("row", "calendar-row")}>
      {weekDates.map((d, di) => (
        <BaroMeterDate
          key={`bm-${weekIdx * 10 + di}`}
          date={d}
          isToday={d === today}
          isActive={selectedViewType === TabEnum.REPORT}
          onClick={() => handleClickDate(d)}
        />
      ))}
    </div>
  );
};

interface WeeklyProps {
  weekIdx?: number;
  weekDates: number[];
  today?: number;
  className?: string;
  onClickDate?: (date: number) => void;
}

export default function Weekly({
  weekIdx = 0,
  weekDates,
  today,
  className,
  onClickDate = () => {},
}: WeeklyProps) {
  const selectedViewType = useRecoilValue(selectedTabState);
  const viewProps = {
    weekIdx,
    weekDates,
    today,
    selectedViewType,
    className,
    handleClickDate: onClickDate,
  };
  return <WeeklyView {...viewProps} />;
}
