import { barometerState } from "@/recoils/barometer";
import { dayOfWeekCountState } from "@/recoils/calendar";
import { missionsState } from "@/recoils/mission";
import { selectedTabState } from "@/recoils/tab";
import { TabEnum } from "@/types/tab";
import { useEffect, useMemo } from "react";
import { useRecoilValue } from "recoil";

export const useWeeklyCalendar = () => {
  const selectedTab = useRecoilValue(selectedTabState);

  const isMission = useMemo(
    () => selectedTab === TabEnum.MISSION,
    [selectedTab]
  );

  useEffect(() => {
    console.log("isMission: ", isMission);
  }, [isMission]);

  const dayOfWeekCount = useRecoilValue(dayOfWeekCountState(isMission));
  const barometer = useRecoilValue(barometerState(isMission));
  const missions = useRecoilValue(missionsState(isMission));

  return {
    dayOfWeekCount,
    barometer,
    missions,
  };
};
