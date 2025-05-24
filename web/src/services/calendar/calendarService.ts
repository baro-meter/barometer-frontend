import httpClient from "@/services/httpClient";
import {
  CalendarViewType,
  MonthlyCalendarViewType,
  WeeklyCalendarViewType,
} from "@/types/calendar";
import { GoalType } from "@/types/goal";
import { AxiosHeaderValue } from "axios";

export const getGoals = async (year: number, week: number) => {
  const url = `/goal`;
  const params = { year, week };
  return httpClient.get<GoalType[]>(url, {
    params,
  });
};

export const getCalendarView = async (startDate: string, endDate: string) => {
  const url = `/view/calendar`;
  const params = { startDate, endDate };

  return httpClient.get<CalendarViewType>(url, { params });
};

export const getWeeklyCalendarView = async (
  year: number,
  week: number,
  headers?: {
    Authorization: AxiosHeaderValue;
  }
) => {
  const url = `/view`;
  const params = { year, week };

  return httpClient.get<WeeklyCalendarViewType>(url, { params, headers });
};

export const getMonthlyCalendarView = async (
  yearWeeks: string, // YYYY-MM
  headers?: {
    Authorization: AxiosHeaderValue;
  }
) => {
  const url = `/view`;
  const params = { yearWeeks };

  return httpClient.get<MonthlyCalendarViewType>(url, { params, headers });
};
