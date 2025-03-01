import { GoalCategoryType, GoalTypeId } from "@/types/goal";

export const CategorieMapper = {
  [GoalTypeId.REGULAR_LIFE]: {
    typeId: GoalTypeId.REGULAR_LIFE,
    text: "규칙적인 생활",
    order: 1,
  },
  [GoalTypeId.PEACE_OF_MIND]: {
    typeId: GoalTypeId.PEACE_OF_MIND,
    text: "마음의 여유",
    order: 2,
  },
  [GoalTypeId.WEIGHT_MANAGEMENT]: {
    typeId: GoalTypeId.WEIGHT_MANAGEMENT,
    text: "체중 관리",
    order: 3,
  },
  [GoalTypeId.CONDITION_IMPROVEMENT]: {
    typeId: GoalTypeId.CONDITION_IMPROVEMENT,
    text: "컨디션 개선",
    order: 4,
  },
  [GoalTypeId.BASIC_STRENGTH]: {
    typeId: GoalTypeId.BASIC_STRENGTH,
    text: "기초체력 향상",
    order: 5,
  },
  [GoalTypeId.OTHER]: { typeId: GoalTypeId.OTHER, text: "기타", order: 999 },
} as { [typeId: number]: GoalCategoryType };

const AllCategories = Object.values(CategorieMapper);

export const useCategory = () => {
  // categoryLabel 컴포넌트에서 쓰임
  const getAllCategoryLableItems = () => {
    return [{ text: "전체", order: 0 }, ...AllCategories].sort(
      (a, b) => a.order - b.order
    );
  };

  const getCategoryInfo = (typeId: number) => CategorieMapper[typeId];

  return { getAllCategoryLableItems, getCategoryInfo };
};
