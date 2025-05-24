import { MISSION_INFO, MissionCategoryId } from "@/types/mission";

const AllCategories = Object.values(MISSION_INFO);

export const useCategory = () => {
  // categoryLabel 컴포넌트에서 쓰임
  const getAllCategoryLableItems = () => {
    return [
      { icon: "", title: "전체", description: "", order: 0 },
      ...AllCategories,
    ].sort((a, b) => a.order - b.order);
  };

  const getCategoryInfo = (typeId: MissionCategoryId) => MISSION_INFO[typeId];

  return { getAllCategoryLableItems, getCategoryInfo };
};
