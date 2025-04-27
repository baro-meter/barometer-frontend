import { currentBarometerState } from "@/recoils/barometer";
import {
  currentDayOfWeekCountState,
  currentWeeklyCalendarViewState,
} from "@/recoils/calendar";
import { currentMissionsState } from "@/recoils/mission";
import { getWeeklyCalendarView } from "@/services/calendar/calendarService";
import { BaroMeterType } from "@/types/barometerType";
import { WeeklyCalendarViewType } from "@/types/calendar";
import { MissionPerType } from "@/types/mission";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export const useWeeklyCalendar = (year: number, week: number) => {
  // current일 때(mission tab)와 아닐 때(calendar) recoil 값 다르게 설정
  const isCurrent = useMemo(() => {
    return year === dayjs().year() && week === dayjs().week();
  }, [year, week]);

  // recoil 값 가져오기
  const [currentWeeklyCalendarView, setCurrentWeeklyCalendarView] =
    useRecoilState(currentWeeklyCalendarViewState);
  const currnetDayOfWeekCount = useRecoilValue(currentDayOfWeekCountState);
  const currentBarometer = useRecoilValue(currentBarometerState);
  const currentMissions = useRecoilValue(currentMissionsState);

  // 공통 데이터
  const [dayOfWeekCount, setDayOfWeekCount] = useState<number[]>([]);
  const [barometer, setBarometer] = useState<BaroMeterType | undefined>(
    undefined
  );
  const [missions, setMissions] = useState<MissionPerType[]>([]);

  useEffect(() => {
    // TODO isDone에 따른 데이터 조회 설정 로직 적용 필요
    if (isCurrent) {
      setDayOfWeekCount(currnetDayOfWeekCount);
      setBarometer(currentBarometer);
      setMissions(currentMissions);
    }
  }, [isCurrent, currnetDayOfWeekCount, currentBarometer, currentMissions]);
};
