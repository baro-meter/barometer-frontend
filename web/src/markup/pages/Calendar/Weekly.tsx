import React from "react";
import CalendarHeaderView from "@/markup/components/calendar/CalendarHeaderView";
import MonthlyCalendarView from "@/markup/components/calendar/MonthlyCalendarView";
import dayjs from "dayjs";

interface LayoutProps {}

const CalendarWeekly = ({}: LayoutProps) => {
  return (
    <div className="wrap">
      <main className="main">
        <div className="contents">
          <div className="calendar-area">
            <CalendarHeaderView
              type="weekly"
              year={2024}
              month={12}
              onToggleCalendarType={() => {}}
              onClickTodayMoveBtn={() => {}}
              onChangeDate={() => {}}
            />
            <MonthlyCalendarView year={2024} month={12} date={dayjs().date()} />
          </div>
        </div>
        <div className="bottom-area"></div>
      </main>
    </div>
  );
};

export default CalendarWeekly;
