import httpClient from "@/services/httpClient";
import { CalendarViewType } from "@/types/calendar";
import { GoalType } from "@/types/goal";
import { useQuery } from "@tanstack/react-query";

export const getGoals = async (year: number, month: number) => {
  const url = `/goal`;
  const params = { year, month };
  return httpClient.get<GoalType[]>(url, {
    params,
  });
};

export const getCalendarView = async (startDate: string, endDate: string) => {
  const url = `/view/calendar`;
  const params = { startDate, endDate };

  return httpClient.get<CalendarViewType>(url, { params });
};
