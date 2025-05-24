import React from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/calendar.module.scss";
import BaroMeterDate from "./BaroMeterDate";
import { selectedTabState } from "@/recoils/tab";
import { useRecoilValue } from "recoil";
import { TabEnum } from "@/types/tab";
import { WeekDateViewItem } from "@/types/calendar";

const cn = classNames.bind(scss);

/**
 * [to-be]
 * - 이제 캘린더의 baroMeter 표시되는 weekly 컴포넌트는 archived 개수만 바라본다.
 * - weekly view와 monthly view에서 바라보는 데이터가 달라져서
 * component parmater로 archivedCountList를 받게 됨
 */
/**
 * 2024.10.26 기준 마크업 컴포넌트 코드로 업데이트 완료
 */
interface WeeklyViewProps {
  weekIdx: number;
  weekDates: WeekDateViewItem[];
  selectedViewType: TabEnum;
  today?: number;
  showBaroMeterNumber?: boolean;
  // handleClickDate: (date: number) => void;
}

const WeeklyView = ({
  weekIdx,
  weekDates,
  selectedViewType,
  today,
  showBaroMeterNumber,
}: // handleClickDate,
WeeklyViewProps) => {
  return (
    <div role="row" key={weekIdx} className={cn("row", "calendar-row")}>
      {weekDates.map((d, di) => (
        <BaroMeterDate
          key={`bm-${weekIdx * 10 + di}`}
          date={d.date}
          score={d.archivedCount}
          isToday={d.date === today && selectedViewType === TabEnum.MISSION}
          // isActive: 바로미터 있는 데이터 중 숫자&색 활성화 => only 2번째 탭 weekly 모드
          isActive={showBaroMeterNumber}
          // TODO 삭제 -> weekly 전체 클릭으로 변경 필요
          // onClick={() => handleClickDate(d)}
        />
      ))}
    </div>
  );
};

interface WeeklyProps {
  weekIdx?: number;
  weekDates: WeekDateViewItem[];
  today?: number;
  className?: string;
  showBaroMeterNumber?: boolean;
  // onClickDate?: (date: number) => void;
}

export default function Weekly({
  weekIdx = 0,
  weekDates,
  today,
  className,
  showBaroMeterNumber = false,
}: // onClickDate = () => {},
WeeklyProps) {
  // to-be
  // dlfek

  // as-is
  const selectedViewType = useRecoilValue(selectedTabState);
  const viewProps = {
    weekIdx,
    weekDates,
    today,
    selectedViewType,
    className,
    showBaroMeterNumber,
    // handleClickDate: onClickDate,
  };
  return <WeeklyView {...viewProps} />;
}
