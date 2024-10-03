import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/calendar.module.scss";
import dayjs from "dayjs";
import Weekly from "@/components/calendar/Weekly";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import DayHeader from "@/markup/components/calendar/DayHeaderView";
import { Swiper, SwiperSlide } from "swiper/react";
import { type Swiper as SwiperTypes } from "swiper";

dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

const cn = classNames.bind(scss);

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
    <div className={cn("container")} role="grid">
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
          <div role="rowgroup">
            <Weekly
              weekDates={calendarDates}
              activeDate={activeDate}
              onClickDate={handleClickDate}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide />
      </Swiper>
    </div>
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
    let startDate = dayjs().year(year).week(selectedDate.week()).day(0);
    for (let i = 0; i < 7; i++) {
      dates.push(startDate.add(i, "day").date());
    }
    setCalendarDates(dates);
  }, [year, selectedDate]);

  const handleClickDate = (d: number) => {
    const goalDate = selectedDate.set("date", d);
    setSelectedDate(goalDate);

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

      setSelectedDate(goalDate);
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
