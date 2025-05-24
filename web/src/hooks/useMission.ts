import dayjs from "dayjs";
import { useCategory } from "./useCategory";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { MissionCategoryId, MissionType } from "@/types/mission";
import { useWeeklyCalendar } from "./useWeeklyCalendar";
import { useMemo } from "react";

dayjs.extend(weekOfYear);

/**
 * [new api]
 * mission을 관리하는 hook
 * - 화면 root에서 tab선언 필수
 */
export const useMission = () => {
  const { missions } = useWeeklyCalendar();
  const { getCategoryInfo } = useCategory();

  const allMissions = useMemo(() => {
    return missions.reduce((list, obj) => {
      list.push(...obj.goals);
      return list;
    }, [] as MissionType[]);
  }, [missions]);

  // goalsPerTypes의 type이 key고, goals가 목록인 Map
  const missionsByTypeId = useMemo(() => {
    return missions.reduce((map, obj) => {
      const { type, goals } = obj;
      map.set(type, goals);
      return map;
    }, new Map<MissionCategoryId, MissionType[]>());
  }, [missions]);

  const missionCategories = useMemo(() => {
    return [
      { icon: "", title: "전체", description: "", order: 0 },
      ...missions
        .map((missionPerType) => getCategoryInfo(missionPerType.type))
        .filter((_) => !!_),
    ];
  }, [missions]);

  return {
    allMissions, // 전체 미션 리스트
    missionsByTypeId, // 카테고리 별 미션 map
    missionCategories, // 활성화된 미션 카테고리 탭 목록
  };
};
