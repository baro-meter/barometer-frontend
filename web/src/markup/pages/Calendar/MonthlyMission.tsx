import React from "react";
import CalendarHeaderView from "@/markup/components/calendar/CalendarHeaderView";
import MonthlyCalendarView from "@/markup/components/calendar/MonthlyCalendarView";
import SubTab from "@/markup/components/SubTab";
import dayjs from "dayjs";
import MissionSummary from "@/markup/components/SummaryView";

const CalendarMonthlyMission = () => {
  return (
    <div className="wrap">
      <main className="main calendar">
        <CalendarHeaderView
          type="monthly"
          year={2024}
          month={12}
          onToggleCalendarType={() => {}}
          onClickTodayMoveBtn={() => {}}
          onChangeDate={() => {}}
        />
        <div className="contents">
          <div className="calendar-area">
            <MonthlyCalendarView year={2024} month={12} date={dayjs().date()} />
          </div>
        </div>
        <div className="bottom-area">
          <div className="inner">
            <SubTab title="15.TODAY" />
            <div className="mission-area">
              <MissionSummary
                text="오늘은 필라테스를 1년째 간 날이다. 체지방량이 줄어들었고 근육도 조금 커졌다. 너무 뿌듯하다. 세줄일때 말줄임 세줄일때 말줄임 세줄일때 말줄임 세줄일때 말줄임 세줄일때 말줄임 세줄일때 말줄임 세줄일때 말줄임"
                typeFull={false}
                imgSrc="https://picsum.photos/200"
                missionTexts={[
                  "일이삼사오육칠팔",
                  "Monthly에서는 한줄로 노출되도록 해주세용",
                ]}
                score={4}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CalendarMonthlyMission;
