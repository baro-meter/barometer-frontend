import React from "react";
import CalendarHeaderView from "@/markup/components/calendar/CalendarHeaderView";
import MonthlyCalendarView from "@/markup/components/calendar/MonthlyCalendarView";
import SubTab from "@/markup/components/SubTab";
import dayjs from "dayjs";
import CategoryLabel from "@/markup/components/CategoryLabel";
import ProgressListView from "@/markup/components/ProgressListView";

const CalendarMonthly = () => {
  return (
    <div className="wrap">
      <main className="main">
        <div className="contents">
          <div className="calendar-area">
            <CalendarHeaderView
              type="monthly"
              year={2024}
              month={12}
              onToggleCalendarType={() => {}}
              onClickTodayMoveBtn={() => {}}
              onChangeDate={() => {}}
            />
            <MonthlyCalendarView year={2024} month={12} date={dayjs().date()} />
          </div>
        </div>
        <div className="bottom-area">
          <div className="inner">
            <SubTab title="15.TODAY" hasBorder />
            <div className="tab-area">
              <CategoryLabel />
              <ProgressListView
                alignment="horizontal"
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
      </main>
    </div>
  );
};

export default CalendarMonthly;
