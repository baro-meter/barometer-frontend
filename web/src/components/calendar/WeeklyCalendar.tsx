import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import Weekly from "@/components/calendar/Weekly";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import DayHeader from "@/markup/components/calendar/DayHeaderView";
import { getWeeklyDateRange } from "@/utils/calendarUtil";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedTabState } from "@/recoils/tab";
import { TabEnum } from "@/types/tab";
import { Swiper, SwiperSlide } from "swiper/react";
import { type Swiper as SwiperTypes } from "swiper";
import "swiper/css";
import { selectedDayjsState } from "@/recoils/calendar";

dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

interface WeeklyCalendarViewProps {
  useSwiper: boolean;
  calendarDates: number[];
  today: number;
  setSwiper: React.Dispatch<React.SetStateAction<SwiperTypes | undefined>>;
  handleSwipeWeek: (activeIdx: number) => void;
}

const WeeklyCalendarView = ({
  useSwiper,
  calendarDates,
  today,
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
        <Weekly weekDates={calendarDates} today={today} />
      )}
    </>
  );
};

interface WeeklyCalendarProps {}

export default function WeeklyCalendar({}: WeeklyCalendarProps) {
  const selectedTab = useRecoilValue(selectedTabState);
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDayjsState);
  const [calendarDates, setCalendarDates] = useState<number[]>(new Array(7));
  const [swiper, setSwiper] = useState<SwiperTypes>();

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
    let goalDate;
    if (activeIndex === 0) {
      goalDate = selectedDate.subtract(1, "week").day(0);
    } else if (activeIndex === 2) {
      goalDate = selectedDate.add(1, "week").day(0);
    }
    console.log(`goalDate: ${goalDate}`);
    if (goalDate && swiper) {
      swiper.slideTo(1);
      setSelectedDate(goalDate);
      // TODO 변경된 날짜에 따른 goals 조회 필요
    }
  };

  const useSwiper = useMemo(
    () => selectedTab === TabEnum.REPORT,
    [selectedTab]
  );

  const viewProps = {
    useSwiper,
    calendarDates,
    today: dayjs().date(),
    setSwiper,
    handleSwipeWeek,
  };

  return <WeeklyCalendarView {...viewProps} />;
}
