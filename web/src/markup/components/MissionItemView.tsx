import React from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/mission.module.scss";
import {
  MISSION_TYPES,
  MissionItem,
  SubMissionItem,
  MissionType,
} from "@/types/mission";
// @ts-ignore
import Image from "next/image";
import { basePath } from "next.config";
import Divider from "@/markup/components/Divider";
import MissionSubListView from "@/markup/components/MissionSubListView";

const cn = classNames.bind(scss);

// 표시 유형을 위한 타입 정의
type ViewType = "missionOnly" | "both" | "subMissionOnly";

interface MissionItemViewProps {
  mission: MissionItem & { missionType?: MissionType };
  missionType?: MissionType;
  viewType?: ViewType;
  subMissions?: SubMissionItem[];
  children?: React.ReactNode;
}

export const MissionItemView = ({
  mission,
  missionType = "routine",
  viewType = "both",
  subMissions = [],
  children,
}: MissionItemViewProps) => {
  // mission 객체에서 missionType이 있으면 사용, 없으면 props의 missionType 사용
  const actualMissionType = mission.missionType || missionType;

  return (
    <div className={cn("mission-item")}>
      {/* 미션 정보 영역 - missionOnly 또는 both일 때만 표시 */}
      {(viewType === "missionOnly" || viewType === "both") && (
        <div className={cn("mission-item-inner")}>
          {/* @ts-ignore */}
          <Image
            src={`${basePath}/img/icon-${actualMissionType}.svg`}
            alt=""
            width={36}
            height={36}
          />
          <div className={cn("mission-item-content")}>
            <strong className={cn("mission-item-title")}>
              {mission.title}
            </strong>
            <p className={cn("mission-item-description")}>
              {mission.description}
            </p>
          </div>
          {children || (
            <button className={cn("mission-item-button")}>
              {/* @ts-ignore */}
              <Image
                src={`${basePath}/img/icon-trash.svg`}
                width={20}
                height={20}
                alt="삭제"
              />
            </button>
          )}
        </div>
      )}

      {/* 구분선 - both일 때만 표시 */}
      {viewType === "both" && <Divider spacing={20} />}

      {/* 서브미션 영역 - both 또는 subMissionOnly일 때만 표시 */}
      {(viewType === "both" || viewType === "subMissionOnly") && (
        <MissionSubListView missions={subMissions} />
      )}
    </div>
  );
};

export default MissionItemView;
