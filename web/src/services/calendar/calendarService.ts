import httpClient from "@/services/httpClient";
import { CalendarViewType } from "@/types/calendar";
import { GoalType } from "@/types/goal";

export const getGoals = async (year: number, month: number) => {
  const url = `/goal`;
  const params = { year, month };
  return httpClient.get<GoalType[]>(url, {
    params,
  });
};

// export const getCalendarView = async (startDate: string, endDate: string) => {
export const getCalendarView = async (year: number, month: number) => {
  const url = `/view/calendar`;
  const params = { year, month };
  return httpClient.get<CalendarViewType>(url, { params });
};
