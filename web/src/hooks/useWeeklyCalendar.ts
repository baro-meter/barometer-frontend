import { currentBarometerState } from "@/recoils/barometer";
import {
  currentDayOfWeekCountState,
  currentWeeklyCalendarViewState,
} from "@/recoils/calendar";
import { currentMissionsState } from "@/recoils/mission";
import { selectedTabState } from "@/recoils/tab";
import { BaroMeterType } from "@/types/barometerType";
import { MissionPerType } from "@/types/mission";
import { TabEnum } from "@/types/tab";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export const useWeeklyCalendar = () => {
  const selectedTab = useRecoilValue(selectedTabState);

  // recoil 값 가져오기
  const currentWeeklyCalendarView = useRecoilValue(
    currentWeeklyCalendarViewState
  );
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
    if (selectedTab === TabEnum.MISSION) {
      // isDone일 경우 아예 이 hook이 WeeklyCalendar에 호출되지 않아 그 케이스는 처리 안함. (default 값 내려줌)
      setDayOfWeekCount(currnetDayOfWeekCount);
      setBarometer(currentBarometer);
      setMissions(currentMissions);
    }
  }, [selectedTab, currnetDayOfWeekCount, currentBarometer, currentMissions]);

  return {
    dayOfWeekCount,
    barometer,
    missions,
  };
};
