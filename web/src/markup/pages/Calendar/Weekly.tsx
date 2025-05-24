import React from "react";
import CalendarHeaderView from "@/markup/components/calendar/CalendarHeaderView";
import WeeklyCalendarView from "@/markup/components/calendar/WeeklyView";
import DayHeader from "@/markup/components/calendar/DayHeaderView";
import CategoryLabel from "@/markup/components/CategoryLabel";
import ProgressListView from "@/markup/components/ProgressListView";
import Button from "@/markup/components/ButtonView";
import dayjs from "dayjs";
import { useGoal } from "@/hooks/useGoal";

interface LayoutProps {}

const CalendarWeekly = ({}: LayoutProps) => {
  const { goalCategories } = useGoal(dayjs());
  return (
    <div className="wrap">
      {/* weekly: main에 weekly-view 클래스 추가 (하단 bottom-area가 스크롤 될 수 있도록) */}
      <main className="main calendar weekly-view">
        <CalendarHeaderView
          type="weekly"
          year={2024}
          month={12}
          onToggleCalendarType={() => {}}
          onClickTodayMoveBtn={() => {}}
          onChangeDate={() => {}}
        />
        <div className="contents">
          <div className="calendar-area">
            <DayHeader />
            <WeeklyCalendarView
              weekIdx={0}
              weekDates={[1, 2, 3, 4, 5, 6, 7]}
              activeDate={dayjs().date()}
            />
          </div>
        </div>
        <div className="bottom-area">
          <div className="inner">
            <div className="tab-area">
              <CategoryLabel items={goalCategories} />
              <ProgressListView
                alignment="vertical"
                progressList={[
                  { task: "일이삼사오육칠팔", count: 5 },
                  { task: "걸어서 회사가기", count: 3 },
                  { task: "우유 한잔 마시기", count: 5 },
                  { task: "근력 운동 하기", count: 4 },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="fixed-area">
          <Button as="a" href="/" label="오늘의 바로미터 작성" />
        </div>
      </main>
    </div>
  );
};

export default CalendarWeekly;
