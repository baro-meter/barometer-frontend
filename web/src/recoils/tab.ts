import { TabEnum } from "@/types/tab";
import { atom } from "recoil";
import { v1 } from "uuid";

/**
 * 선택된 탭
 */
export const selectedTabState = atom<TabEnum>({
  key: `tab/${v1}`,
  default: TabEnum.MISSION,
});
