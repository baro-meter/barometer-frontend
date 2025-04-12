import React from "react";
import WeeklyCalendarView from "@/markup/components/calendar/WeeklyView";
import DayHeader from "@/markup/components/calendar/DayHeaderView";
import CategoryLabel from "@/markup/components/CategoryLabel";
import ProgressListView from "@/markup/components/ProgressListView";
import Button from "@/markup/components/ButtonView";
import Header from "@/markup/components/HeaderView";
import { GoalCategoryType, GoalTypeId } from "@/types/goal";

const CalendarWeekly = () => {
  const customCategories: GoalCategoryType[] = [
    { text: "전체", order: 0 },
    { typeId: GoalTypeId.REGULAR_LIFE, text: "규칙적인 생활", order: 1 },
    { typeId: GoalTypeId.PEACE_OF_MIND, text: "마음의 안정", order: 2 },
    { typeId: GoalTypeId.WEIGHT_MANAGEMENT, text: "체중 관리", order: 3 },
    { typeId: GoalTypeId.CONDITION_IMPROVEMENT, text: "컨디션 개선", order: 4 },
  ];

  return (
    <div className="wrap">
      {/* weekly: main에 weekly-view 클래스 추가 (하단 bottom-area가 스크롤 될 수 있도록) */}
      <main className="main calendar weekly-view">
        <Header headerType="basic" titleText="LAST WEEK" />
        <div className="contents">
          <div className="calendar-area">
            <DayHeader />
            <WeeklyCalendarView
              weekIdx={0}
              weekDates={[1, 2, 3, 4, 5, 6, 7]}
              allActive={true}
              dateData={[
                { date: 1, score: 1, successGoalCount: 1 },
                { date: 2, score: 3, successGoalCount: 2 },
                { date: 3, score: 3, successGoalCount: 3 },
                { date: 4, score: 4, successGoalCount: 4 },
                { date: 5, score: 1, successGoalCount: 1 },
                { date: 6, score: 0, successGoalCount: 0 },
                { date: 7, score: 0, successGoalCount: 0 },
              ]}
            />
          </div>
        </div>
        <div className="bottom-area">
          <div className="inner">
            <div className="tab-area">
              <CategoryLabel items={customCategories} />
              <ProgressListView
                alignment="vertical"
                progressList={[
                  { task: "일이삼사오육칠팔", count: 7 },
                  { task: "걸어서 회사가기", count: 7 },
                  { task: "우유 한잔 마시기", count: 7 },
                  { task: "근력 운동 하기", count: 7 },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="fixed-area">
          <Button as="a" href="/" label="작성한 바로미터 보기 👀" />
        </div>
      </main>
    </div>
  );
};

export default CalendarWeekly;
