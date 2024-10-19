import httpClient from "@/services/httpClient";
import { CalendarViewType } from "@/types/calendar";
import { GoalType } from "@/types/goal";

export const getGoals = async (year: number, month: number) => {
  // TODO 실제 api 호출 테스트 - 지금은 api 구동이 안됨
  const url = `/goal`;
  const params = { year, month };
  return httpClient.get<GoalType[]>(url, {
    params,
    // TODO getServerSideProps에서 못 넣고 있음 -> cookie로 해결 필요
    headers: {
      // Authorization:
      //   "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJiYXJvbWV0ZXIiLCJzdWIiOiIyIiwiZXhwIjoxNzI4ODg4NzU2LCJpYXQiOjE3Mjg4MDIzNTZ9.uVibjZ9eYOINZ_5VdRXreA6_vVIJEEqCcQguxLk5oTJ48GB7vcIKx_aQJwBsiK_bdBYOEZ1269JpBKc3UxAWKA",
    },
  });

  // return [
  //   {
  //     id: 1,
  //     title: "필라테스",
  //     typeId: 1,
  //     count: 1,
  //     archived: ["2024-12-30", "2024-12-31"],
  //   },
  //   {
  //     id: 2,
  //     title: "하루에 물 1리터 마시기",
  //     typeId: 2,
  //     count: 7,
  //     archived: ["2024-12-30", "2024-12-31"],
  //   },
  // ] as GoalType[];
};

export const getCalendarView = async (startDate: string, endDate: string) => {
  // TODO 실제 api 호출 테스트 - 지금은 api 구동이 안됨
  //   const url = `/view/calendar`;
  //   const params = { year, month };
  //   return httpClient.get(url, { params });

  return {
    goals: [
      {
        monthlyGoalId: 1,
        title: "필라테스",
        typeId: 1,
        count: 1,
        archivedDates: ["2024-12-01", "2024-12-30", "2024-12-31"],
      },
      {
        monthlyGoalId: 2,
        title: "하루에 물 1리터 마시기",
        typeId: 2,
        count: 7,
        archivedDates: ["2024-12-30", "2024-12-31"],
      },
    ],
    reports: [
      {
        date: "2024-12-01",
        score: 0,
      },
      {
        date: "2024-12-30",
        score: 3,
      },
      {
        date: "2024-12-31",
        score: 3,
      },
    ],
  } as CalendarViewType;
};
