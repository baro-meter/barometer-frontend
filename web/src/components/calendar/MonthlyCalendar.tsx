import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/calendar.module.scss";
import dayjs from "dayjs";
import Weekly from "./Weekly";
import DayHeader from "@/markup/components/calendar/DayHeaderView";

const cn = classNames.bind(scss);

/**
 * 2024.10.26 기준 마크업 컴포넌트 코드로 업데이트 완료
 */
interface MonthlyCalendarViewProps {
  monthlyDayjs: dayjs.Dayjs;
  calendarDates: number[][];
  layoutRef: React.MutableRefObject<HTMLDivElement | null>;
  isSixWeeks: boolean;
  handleClickDate: (date: number) => void;
}

const MonthlyCalendarView = ({
  monthlyDayjs,
  calendarDates,
  layoutRef,
  isSixWeeks,
  handleClickDate,
}: MonthlyCalendarViewProps) => {
  return (
    <>
      <div className={cn("container")} role="grid">
        <DayHeader />
        <div role="rowgroup" className={cn("calendar")} ref={layoutRef}>
          {calendarDates.map((w, i) =>
            !isSixWeeks && i === 5 ? (
              <div key={`w-${i}`}></div>
            ) : (
              <Weekly
                key={`w-${i}`}
                weekIdx={i}
                weekDates={w}
                activeDate={monthlyDayjs.date()}
                onClickDate={handleClickDate}
              />
            )
          )}
        </div>
      </div>
    </>
  );
};

interface MonthlyCalendarProps {
  year: number;
  month: number;
  date: number; // 선택된 날짜가 있을 경우 넘어옴
  onChangeDate?: (d: dayjs.Dayjs) => void;
}

export default function MonthlyCalendar({
  year,
  month,
  date,
  onChangeDate,
}: MonthlyCalendarProps) {
  const [dayjsObject, setDayjsObject] = useState<dayjs.Dayjs>(
    dayjs()
      .year(year)
      .month(month - 1)
      .set("date", date)
  );
  const [calendarDates, setCalendarDates] = useState<number[][]>(
    Array.from(Array(6), () => new Array(7))
  );
  // TODO 전체 페이지 스크롤이 되어야 하는 경우 props로 받고 페이지 단위에서 처리 필요
  // 우선은 해당 캘린더 내부에서만 스크롤 될 수 있게 한다.
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const layoutRef = useRef<HTMLDivElement>(null);

  // 캘린더 그려주는 부분에 date는 필요없어서 효율성을 위해 별도로 트리거링
  useEffect(() => {
    // 1일 기준으로 달력을 채운다.
    let day = dayjsObject.date(1).day();
    let ndate = 1;

    const dates = Array.from(Array(6), () => new Array(7).fill(0));
    const maxDate = dayjsObject.daysInMonth();

    // 첫째 주
    while (day < 7) {
      dates[0][day++] = ndate++;
    }
    // 나머지
    for (let w = 1; w < 6; w++) {
      for (let d = 0; d < 7; d++) {
        dates[w][d] = ndate++;
        if (maxDate < ndate) break;
      }
      if (maxDate < ndate) break;
    }
    setCalendarDates(dates);
  }, [dayjsObject.year(), dayjsObject.month()]);

  useEffect(() => {
    setDayjsObject(
      dayjs()
        .year(year)
        .month(month - 1)
        .set("date", date)
    );
  }, [month, year, date]);

  useEffect(() => {
    const handleScroll = () => {
      if (calendarDates[5][0] > 0 && layoutRef.current) {
        const scrollTop = layoutRef?.current?.scrollTop;
        if (scrollTop > lastScrollTop) {
          // 아래 방향
          layoutRef.current.scrollTop = layoutRef.current.clientHeight;
        } else {
          layoutRef.current.scrollTop = 0;
        }
      }
    };

    if (layoutRef.current) {
      layoutRef.current.addEventListener("scroll", handleScroll);
      return () =>
        layoutRef.current?.removeEventListener("scroll", handleScroll);
    }
  }, [calendarDates, layoutRef]);

  const isSixWeeks = useMemo(() => {
    return calendarDates[5][0] > 0;
  }, [calendarDates]);

  const handleClickDate = (d: number) => {
    const changedDate = dayjsObject.set("date", d);
    setDayjsObject(changedDate);
    if (onChangeDate) {
      onChangeDate(changedDate);
    }
  };

  /** deprecated 달 넘기기 기능 (사용 여부 기획 확인 필요) */
  const handleArrowClicked = useCallback(
    (type: "next" | "prev") => {
      let changedDate = dayjsObject;
      if (type === "next") {
        changedDate = changedDate.add(1, "month").set("date", 1);
      } else {
        changedDate = changedDate.subtract(1, "month").set("date", 1);
      }

      setDayjsObject(changedDate);
      if (onChangeDate) {
        onChangeDate(changedDate);
      }
    },
    [dayjsObject]
  );

  const viewProps = {
    monthlyDayjs: dayjsObject,
    calendarDates,
    layoutRef,
    isSixWeeks,
    handleClickDate,
    handleArrowClicked,
  };

  return <MonthlyCalendarView {...viewProps} />;
}
