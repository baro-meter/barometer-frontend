import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Weekly from "@/components/calendar/Weekly";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import DayHeader from "@/markup/components/calendar/DayHeaderView";
import { Swiper, SwiperSlide } from "swiper/react";
import { type Swiper as SwiperTypes } from "swiper";
import { getWeeklyDateRange } from "@/utils/calendarUtil";

dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

interface WeeklyCalendarViewProps {
  calendarDates: number[];
  activeDate: number;
  setSwiper: React.Dispatch<React.SetStateAction<SwiperTypes | undefined>>;
  handleClickDate: (d: number) => void;
  handleSwipeWeek: (activeIdx: number) => void;
}

const WeeklyCalendarView = ({
  calendarDates,
  activeDate,
  setSwiper,
  handleClickDate,
  handleSwipeWeek,
}: WeeklyCalendarViewProps) => {
  return (
    <>
      <DayHeader />
      <Swiper
        onSwiper={setSwiper}
        slidesPerView={1}
        initialSlide={1}
        spaceBetween={10}
        onSlideChange={(s) => handleSwipeWeek(s.activeIndex)}
      >
        <SwiperSlide />
        <SwiperSlide>
          <Weekly
            weekDates={calendarDates}
            activeDate={activeDate}
            onClickDate={handleClickDate}
          />
        </SwiperSlide>
        <SwiperSlide />
      </Swiper>
    </>
  );
};

interface WeeklyCalendarProps {
  year: number;
  month: number;
  date: number;
  onChangeDate?: (d: dayjs.Dayjs) => void;
}

export default function WeeklyCalendar({
  year,
  month,
  date,
  onChangeDate,
}: WeeklyCalendarProps) {
  const [swiper, setSwiper] = useState<SwiperTypes>();
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(
    dayjs()
      .year(year)
      .month(month - 1)
      .set("date", date)
  );
  const [calendarDates, setCalendarDates] = useState<number[]>(new Array(7));

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

  const handleClickDate = (newD: number) => {
    // 기존 날짜와 선택된 날짜가 7일 초과 차이 나면 다른 달
    const prevD = selectedDate.date();
    const diff = Math.abs(newD - prevD);
    let goalDate = selectedDate.set("date", newD);
    if (diff > 7) {
      const prevM = selectedDate.month();
      const newM = prevD > newD ? prevM + 1 : prevM - 1;
      goalDate = selectedDate.set("month", newM).set("date", newD);
    }
    if (onChangeDate) {
      onChangeDate(goalDate);
    }
  };

  const handleSwipeWeek = (activeIndex: number) => {
    let goalDate;
    if (activeIndex === 0) {
      goalDate = selectedDate.subtract(1, "week").day(0);
    } else if (activeIndex === 2) {
      goalDate = selectedDate.add(1, "week").day(0);
    }
    if (goalDate && swiper) {
      swiper.slideTo(1);

      if (onChangeDate) {
        onChangeDate(goalDate);
      }
    }
  };

  const viewProps = {
    calendarDates,
    activeDate: date,
    setSwiper,
    handleClickDate,
    handleSwipeWeek,
  };

  return <WeeklyCalendarView {...viewProps} />;
}
