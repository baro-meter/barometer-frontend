import React from "react";
import CalendarHeaderView from "@/markup/components/calendar/CalendarHeaderView";
import MonthlyCalendarView from "@/markup/components/calendar/MonthlyCalendarView";
import dayjs from "dayjs";
import CategoryLabel from "@/markup/components/CategoryLabel";
import { useCalendar } from "@/hooks/useCalendar";
import { GoalCategoryType, GoalTypeId } from "@/types/goal";
import { DateDataItem } from "@/markup/components/calendar/WeeklyView";
import { succesGoalCountType } from "@/markup/components/calendar/BaroMeterDateView";

const CalendarMonthly = () => {
  const { goalCategories } = useCalendar(dayjs());

  const customCategories: GoalCategoryType[] = [
    { text: "전체", order: 0 },
    { typeId: GoalTypeId.REGULAR_LIFE, text: "규칙적인 생활", order: 1 },
    { typeId: GoalTypeId.PEACE_OF_MIND, text: "마음의 안정", order: 2 },
    { typeId: GoalTypeId.WEIGHT_MANAGEMENT, text: "체중 관리", order: 3 },
    { typeId: GoalTypeId.CONDITION_IMPROVEMENT, text: "컨디션 개선", order: 4 },
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
