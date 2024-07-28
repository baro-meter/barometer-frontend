import WeeklyCalendar from "@/components/calendar/WeeklyCalendar";
import dayjs from "dayjs";
import WeeklyHeaderView from "@/markup/components/calendar/WeeklyHeaderView";
import { GetServerSidePropsContext } from "next";
import React, { useCallback, useEffect, useRef, useState } from "react";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import utc from "dayjs/plugin/utc";
import { useRouter } from "next/router";
import { getFormatDayjs } from "@/utils/calendarUtil";
import WeeklyList from "@/components/calendar/WeeklyList";
import { Swiper, SwiperSlide } from "swiper/react";
import { type Swiper as SwiperTypes } from "swiper";
import "swiper/css";

dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(utc);

interface WeeklyPageViewProps {
  year: number;
  month: number;
  week: number;
  date: number;
  isToday: boolean;
  setSwiper: React.Dispatch<React.SetStateAction<SwiperTypes | undefined>>;
  handleChangeMonthlyView: () => void;
  handleChangeSelectedDate: (d: number) => void;
  handleClickTodayMoveBtn: () => void;
  handleSwipeWeek: (activeIdx: number) => void;
}

const WeeklyPageView = ({
  year,
  month,
  week,
  date,
  isToday,
  setSwiper,
  handleChangeMonthlyView,
  handleChangeSelectedDate,
  handleClickTodayMoveBtn,
  handleSwipeWeek,
}: WeeklyPageViewProps) => {
  return (
    <>
      <WeeklyHeaderView
        year={year}
        month={month}
        week={week}
        isToday={isToday}
        onChangeMonthlyView={handleChangeMonthlyView}
        onClickTodayMoveBtn={handleClickTodayMoveBtn}
      />
      <Swiper
        onSwiper={setSwiper}
        slidesPerView={1}
        initialSlide={1}
        spaceBetween={10}
        onSlideChange={(s) => handleSwipeWeek(s.activeIndex)}
      >
        <SwiperSlide />
        <SwiperSlide>
          <WeeklyCalendar
            year={year}
            month={month}
            date={date}
            onChangeDate={handleChangeSelectedDate}
          />
        </SwiperSlide>
        <SwiperSlide />
      </Swiper>
      <WeeklyList year={year} month={month} date={date} />
    </>
  );
};

interface WeeklyPageProps {
  initDate?: string;
}

/**
 * 선택된 날짜 기준으로 week 구하는 법 (api 호출 기준)
 * - year: weekYear(https://day.js.org/docs/en/plugin/week-year)
 * - week: weekOfYear(https://day.js.org/docs/en/plugin/week-of-year)
 */

const WeeklyPage = ({ initDate }: WeeklyPageProps) => {
  const [swiper, setSwiper] = useState<SwiperTypes>();
  const router = useRouter();
  // TODO 기획 측에 달력 인터랙션이 내가 이해한 것과 동일한지 확인 필요
  const [isToday, setIsToday] = useState(true);
  const [selectedDate, setSelectedDate] = useState(dayjs()); // 미선택은 불가능하다고 이해함

  useEffect(() => {
    // 날짜가 바뀔 때 마다 달력이 초기화된다.
    if (!!initDate) {
      setSelectedDate(dayjs(initDate));
    }
  }, [initDate]);

  useEffect(() => {
    const diff = selectedDate.diff(dayjs(), "days");
    setIsToday(diff === 0 && selectedDate.date() === dayjs().date());
  }, [selectedDate]);

  const handleChangeMonthlyView = useCallback(() => {
    router.push(`/calendar/monthly?initDate=${getFormatDayjs(selectedDate)}`);
  }, [selectedDate]);

  const handleChangeSelectedDate = (d: number) => {
    const todayDate = selectedDate.date();

    const diff = Math.abs(todayDate - d);
    if (diff >= 7) {
      // 다른 달
      if (todayDate > d) {
        // 다음 달 선택됨
        setSelectedDate(selectedDate.add(1, "month").set("date", d));
      } else if (todayDate < d) {
        // 이전 달 선택됨
        setSelectedDate(selectedDate.subtract(1, "month").set("date", d));
      }
    } else {
      setSelectedDate(selectedDate.set("date", d));
    }
  };

  const handleClickTodayMoveBtn = () => {
    setSelectedDate(dayjs());
  };

  const handleSwipeWeek = (activeIndex: number) => {
    let goalDate;
    if (activeIndex === 0) {
      goalDate = selectedDate.subtract(1, "week").day(0);
    } else if (activeIndex === 2) {
      goalDate = selectedDate.add(1, "week").day(0);
    }
    if (goalDate && swiper) {
      setSelectedDate(goalDate);
      swiper.slideTo(1);
    }
  };

  const viewProps = {
    year: selectedDate.weekYear(),
    month: selectedDate.month() + 1, // 월은 0부터 시작
    week: selectedDate.week(),
    date: selectedDate.date(),
    isToday,
    setSwiper,
    handleChangeMonthlyView,
    handleChangeSelectedDate,
    handleClickTodayMoveBtn,
    handleSwipeWeek,
  };

  return <WeeklyPageView {...viewProps} />;
};

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const initDate = context.query.initDate ?? "";
  return {
    props: {
      initDate,
    },
  };
};

export default WeeklyPage;
