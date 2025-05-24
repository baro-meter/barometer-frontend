import React from "react";
import CalendarHeaderView from "@/markup/components/calendar/CalendarHeaderView";
import WeeklyCalendarView from "@/markup/components/calendar/WeeklyView";
import DayHeader from "@/markup/components/calendar/DayHeaderView";
import MissionSummary from "@/markup/components/SummaryView";
import SubTab from "@/markup/components/SubTab";
import dayjs from "dayjs";
import { useGoal } from "@/hooks/useGoal";

interface LayoutProps {}

const CalendarWeeklyMission = ({}: LayoutProps) => {
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
            <SubTab title="15.TODAY" />
            <div className="mission-area">
              <MissionSummary
                text="오늘은 필라테스를 1년째 간 날이다. 체지방량이 줄어들었고 근육도 조금 커졌다. 너무 뿌듯하다. 세줄일때 말줄임 세줄일때 말줄임 세줄일때 말줄임 세줄일때 말줄임 세줄일때 말줄임 세줄일때 말줄임 세줄일때 말줄임"
                typeFull
                imgSrc="https://picsum.photos/200"
                missionTexts={[
                  "일이삼사오육칠팔",
                  "물 2L 마시기",
                  "근력 운동 하기",
                  "책 읽기",
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

export default CalendarWeeklyMission;
