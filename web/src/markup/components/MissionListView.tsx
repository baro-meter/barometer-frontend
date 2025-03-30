import React from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/mission.module.scss";
import {
  MISSION_TYPES,
  MISSION_INFO,
  MissionItem,
  SubMissionItem,
} from "@/types/mission";
import MissionItemView from "./MissionItemView";

const cn = classNames.bind(scss);

interface MissionListViewProps {
  missions?: MissionItem[];
  viewType?: "missionOnly" | "both" | "subMissionOnly";
  subMissions?: Record<string, SubMissionItem[]>;
}

export const MissionListView = ({
  missions = [],
  viewType = "missionOnly",
  subMissions = {},
}: MissionListViewProps) => {
  return (
    <div className={cn("mission-list-category")}>
      {MISSION_TYPES.map((type, index) => (
        <MissionItemView
          key={type}
          mission={{
            title: MISSION_INFO[type].title,
            description: MISSION_INFO[type].description,
            typeIndex: index,
            iconType: true,
          }}
          viewType={viewType}
          subMissions={subMissions[type] || []}
        />
      ))}
    </div>
  );
};

export default MissionListView;
