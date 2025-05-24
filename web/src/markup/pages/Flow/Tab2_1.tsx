import React from "react";
import CalendarHeaderView from "@/markup/components/calendar/CalendarHeaderView";
import MonthlyCalendarView from "@/markup/components/calendar/MonthlyCalendarView";
import dayjs from "dayjs";
import CategoryLabel from "@/markup/components/CategoryLabel";
import { DateDataItem } from "@/markup/components/calendar/WeeklyView";
import { succesGoalCountType } from "@/markup/components/calendar/BaroMeterDateView";
import { MissionCategoryId, MissionCategoryInfo } from "@/types/mission";

const CalendarMonthly = () => {
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

  // 확인
  const monthlyDateData: DateDataItem[] = [
    { date: 1, score: 3, successGoalCount: 3 as succesGoalCountType },
    { date: 2, score: 3, successGoalCount: 4 as succesGoalCountType },
    { date: 3, score: 4, successGoalCount: 4 as succesGoalCountType },
    { date: 4, score: 4, successGoalCount: 5 as succesGoalCountType },
    { date: 5, score: 1, successGoalCount: 1 as succesGoalCountType },
    { date: 6, score: 1, successGoalCount: 2 as succesGoalCountType },
    { date: 7, score: 3, successGoalCount: 3 as succesGoalCountType },
    { date: 10, score: 3, successGoalCount: 3 as succesGoalCountType },
    { date: 11, score: 4, successGoalCount: 3 as succesGoalCountType },
  ];

  const currentDate = dayjs().date();

  // 임시로 dateData만 전달하고 allActive는 제거해봅니다
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
            <MonthlyCalendarView
              year={2024}
              month={12}
              date={currentDate}
              dateData={monthlyDateData}
            />
          </div>
        </div>
        <div className="bottom-area">
          <div className="inner">
            <div className="tab-area">
              <CategoryLabel items={customCategories} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CalendarMonthly;
