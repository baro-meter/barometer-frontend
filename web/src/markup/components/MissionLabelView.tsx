import React from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/mission.module.scss";
import Image from "next/image";
import { basePath } from "next.config";
import { MISSION_CATEGORIES, MISSION_INFO, MissionItem } from "@/types/mission";

const cn = classNames.bind(scss);

export interface MissionLabelProps {
  missions: MissionItem[];
  alignType?: boolean;
  checkedIndex?: number;
  onChange?: (index: number) => void;
}

export const MissionLabel = ({
  missions,
  alignType,
  checkedIndex,
  onChange,
}: MissionLabelProps) => {
  return (
    <div className={cn("mission-list", { "type-2x": alignType })}>
      {missions.map((mission, index) => {
        const missionId =
          index < MISSION_CATEGORIES.length
            ? MISSION_CATEGORIES[index]
            : `mission${index}`;
        return (
          <span key={index} className={cn("mission")}>
            <input
              type="radio"
              id={missionId}
              name="mission"
              checked={checkedIndex === index}
              onChange={() => onChange && onChange(index)}
              className={cn("mission-input")}
            />
            <label htmlFor={missionId} className={cn("mission-label")}>
              <strong className={cn("title")}>{mission.title}</strong>
              {mission.description && (
                <p className={cn("description")}>{mission.description}</p>
              )}
              {mission.iconType && (
                <Image
                  src={`${basePath}/img/icon-${missionId}.svg`}
                  width={36}
                  height={36}
                  alt=""
                />
              )}
            </label>
          </span>
        );
      })}
    </div>
  );
};

export default MissionLabel;
