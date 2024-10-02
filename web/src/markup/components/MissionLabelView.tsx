import React from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/mission.module.scss";
import Image from "next/image";
import { basePath } from "next.config";

const cn = classNames.bind(scss);

export interface MissionItem {
  title: string;
  description?: string;
  iconType?: boolean;
}

export interface MissionLabelProps {
  missions: MissionItem[];
  alignType?: boolean;
  checkedIndex?: number;
  onChange?: (index: number) => void;
}

export const MissionLabel = ({ missions, alignType, checkedIndex, onChange }: MissionLabelProps) => {
  return (
    <div className={cn("mission-list", { 'type-2x' : alignType})}>
      {missions.map((mission, index) => (
        <span key={index} className={cn("mission")}>
          <input
            type="radio"
            id={`mission${index}`}
            name="mission"
            checked={checkedIndex === index}
            onChange={() => onChange && onChange(index)}
            className={cn("mission-input")}
          />
          <label 
            htmlFor={`mission${index}`}
            className={cn("mission-label")}
          >
            <strong className={cn("title")}>{mission.title}</strong>
            {mission.description && <p className={cn("description")}>{mission.description}</p>}
            {mission.iconType && 
              <Image
                src={
                  index % 2 === 0
                    ? `${basePath}/img/icon-category.svg`
                    : `${basePath}/img/icon-mission.svg`
                }
                width={36}
                height={36}
                alt=""
              />
            }
          </label>
        </span>
      ))}
    </div>
  );
};

export default MissionLabel;
