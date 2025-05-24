import React from "react";
import WeeklyCalendarView from "@/markup/components/calendar/WeeklyView";
import DayHeader from "@/markup/components/calendar/DayHeaderView";
import CategoryLabel from "@/markup/components/CategoryLabel";
import ProgressListView from "@/markup/components/ProgressListView";
import Button from "@/markup/components/ButtonView";
import Header from "@/markup/components/HeaderView";
import { MissionCategoryId, MissionCategoryInfo } from "@/types/mission";

const CalendarWeekly = () => {
  const customCategories: MissionCategoryInfo[] = [
    { icon: "", title: "전체", description: "", order: 0 },
    {
      typeId: MissionCategoryId.REGULAR_LIFE,
      icon: "routine",
      title: "규칙적인 생활",
      description: "일상의 규칙을 만들어 건강하게 생활해요.",
      order: 1,
    },
    {
      typeId: MissionCategoryId.PEACE_OF_MIND,
      icon: "calm",
      title: "마음의 안정",
      description: "평온한 하루를 위해 나에게 시간을 주세요.",
      order: 2,
    },
    {
      typeId: MissionCategoryId.WEIGHT_MANAGEMENT,
      icon: "weight",
      title: "체중 관리",
      description: "식습관과 운동 관리로 가벼운 몸을 유지해요.",
      order: 3,
    },
    {
      typeId: MissionCategoryId.CONDITION_IMPROVEMENT,
      icon: "condition",
      title: "컨디션 개선",
      description: "건강한 몸과 마음을 위한 습관을 만들어요.",
      order: 4,
    },
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
                  {
                    task: "일이삼사오육칠팔",
                    count: 7,
                    checkedList: [true, false, true, true, false, true, false],
                  },
                  {
                    task: "걸어서 회사가기",
                    count: 7,
                    checkedList: [
                      true,
                      true,
                      true,
                      true,
                      true,
                      false,
                      false,
                      false,
                    ],
                  },
                  {
                    task: "우유 한잔 마시기",
                    count: 7,
                    checkedList: [false, true, true, true, false, false, true],
                  },
                  {
                    task: "근력 운동 하기",
                    count: 7,
                    checkedList: [true, true, true, true, true, true, true],
                  },
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
