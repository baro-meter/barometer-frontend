import React from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/mission.module.scss";
import { SubMissionItem } from "@/types/mission";
const cn = classNames.bind(scss);

interface MissionSubListViewProps {
  missions: SubMissionItem[];
}

export const MissionSubListView = ({ missions }: MissionSubListViewProps) => {
  return (
    <ul className={cn("mission-sub-list")}>
      {missions.map((missionList, index) => (
        <li key={index} className={cn("mission-sub-list-item")}>
          <em className={cn("mission-sub-list-title")}>{missionList.title}</em>
          <span
            className={cn("mission-sub-list-date")}
          >{`이번주 ${missionList.date}일`}</span>
        </li>
      ))}
    </ul>
  );
};

export default MissionSubListView;
