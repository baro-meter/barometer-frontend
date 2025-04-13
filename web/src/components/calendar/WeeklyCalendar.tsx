import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import Weekly from "@/components/calendar/Weekly";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import DayHeader from "@/markup/components/calendar/DayHeaderView";
import { getWeeklyDateRange } from "@/utils/calendarUtil";
import { useRecoilValue } from "recoil";
import { selectedTabState } from "@/recoils/tab";
import { TabEnum } from "@/types/tab";
import { Swiper, SwiperSlide } from "swiper/react";
import { type Swiper as SwiperTypes } from "swiper";
import "swiper/css";

dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

interface WeeklyCalendarViewProps {
  useSwiper: boolean;
  calendarDates: number[];
  activeDate: number;
  setSwiper: React.Dispatch<React.SetStateAction<SwiperTypes | undefined>>;
  handleSwipeWeek: (activeIdx: number) => void;
}

const WeeklyCalendarView = ({
  useSwiper,
  calendarDates,
  activeDate,
  setSwiper,
  handleSwipeWeek,
}: WeeklyCalendarViewProps) => {
  return (
    <>
      <DayHeader />
      {useSwiper ? (
        <Swiper
          onSwiper={setSwiper}
          slidesPerView={1}
          initialSlide={1}
          spaceBetween={10}
          onSlideChange={(s) => handleSwipeWeek(s.activeIndex)}
        >
          <SwiperSlide />
          <SwiperSlide>
            <Weekly weekDates={calendarDates} />
          </SwiperSlide>
          <SwiperSlide />
        </Swiper>
      ) : (
        <Weekly weekDates={calendarDates} activeDate={activeDate} />
      )}
    </>
  );
};

interface WeeklyCalendarProps {
  year: number;
  month: number;
  date: number;
}

export default function WeeklyCalendar({
  year,
  month,
  date,
}: WeeklyCalendarProps) {
  const selectedTab = useRecoilValue(selectedTabState);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(
    dayjs()
      .year(year)
      .month(month - 1)
      .set("date", date)
  );
  const [calendarDates, setCalendarDates] = useState<number[]>(new Array(7));
  const [swiper, setSwiper] = useState<SwiperTypes>();

  useEffect(() => {
    setSelectedDate(
      dayjs()
        .year(year)
        .month(month - 1)
        .set("date", date)
    );
  }, [year, month, date]);

  useEffect(() => {
    // weeklyView는 오늘 기준 일주일만 보여준다. 따라서, 이번주의 weekly date를 구한다.
    const dates = new Array(7);
    const { startDate } = getWeeklyDateRange(selectedDate);
    for (let i = 0; i < 7; i++) {
      dates.push(startDate.add(i, "day").date());
    }
    setCalendarDates(dates);
  }, [selectedDate]);

  const handleSwipeWeek = (activeIndex: number) => {
    console.log(`activeIndex: ${activeIndex}`);
    let goalDate;
    if (activeIndex === 0) {
      goalDate = selectedDate.subtract(1, "week").day(0);
    } else if (activeIndex === 2) {
      goalDate = selectedDate.add(1, "week").day(0);
    }
    console.log(`goalDate: ${goalDate}`);
    if (goalDate && swiper) {
      console.log(`slide`);
      swiper.slideTo(1);
      setSelectedDate(goalDate);
    }
  };

  const useSwiper = useMemo(
    () => selectedTab === TabEnum.REPORT,
    [selectedTab]
  );

  const viewProps = {
    useSwiper,
    calendarDates,
    activeDate: date,
    setSwiper,
    handleSwipeWeek,
  };

  return <WeeklyCalendarView {...viewProps} />;
}
