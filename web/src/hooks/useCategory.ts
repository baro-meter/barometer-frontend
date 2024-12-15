import { GoalCategoryType, GoalTypeId } from "@/types/goal";

const Categories = [
  { typeId: GoalTypeId.REGULAR_LIFE, text: "규칙적인 생활", order: 1 }, // REGULAR_LIFE
  { typeId: GoalTypeId.PEACE_OF_MIND, text: "마음의 여유", order: 2 }, // PEACE_OF_MIND
  { typeId: GoalTypeId.WEIGHT_MANAGEMENT, text: "체중 관리", order: 3 }, // WEIGHT_MANAGEMENT
  { typeId: GoalTypeId.OTHER, text: "기타", order: 999 }, // OTHER
] as const as GoalCategoryType[];

export const useCategory = () => {
  // categoryLabel 컴포넌트에서 쓰임
  const getCategoryLableItems = () => {
    return [{ text: "전체", order: 0 }, ...Categories].sort(
      (a, b) => a.order - b.order
    );
  };

  return { getCategoryLableItems };
};
