import React from "react";
import Badge, { BadgeProps } from "./BadgeView";
import classNames from "classnames/bind";
import scss from "@/styles/components/summary.module.scss";
import Image from "next/image";
import { basePath } from "next.config";

const cn = classNames.bind(scss);

export interface SummaryProps extends BadgeProps {
  text: string;
  typeFull: boolean;
  missionTexts: string[];
}

export const Summary = ({
  text,
  typeFull,
  missionTexts,
  status,
  statusText
}: SummaryProps) => {
  return (
    <div className={cn("summary-wrap", { "type-full": typeFull })}>
      <div className={cn("summary")}>
        <div className={cn("text-wrap")}>
          <Badge status={status} statusText={statusText} />
          <p className={cn("text")}>{text}</p>
        </div>
        <div className={cn("image-wrap")}>
          <Image 
            src="https://picsum.photos/200" // Dummy Image
            alt=""
            {...(typeFull ? { fill: true } : { width: 83, height: 83 })}
          />
        </div>
      </div>
      <div className={cn("mission-list")}>
        {missionTexts.map((mission, index) => (
          <em key={index} className={cn("mission")}>
            <Image
              src={`${basePath}/img/icon-category.svg`}
              width={12}
              height={12}
              alt=""
            />
            {mission}
          </em>
        ))}
      </div> 
      {typeFull && (
        <button type="button" className={cn("btn-more")} aria-label="옵션 (수정/삭제)">
          <Image
            src={`${basePath}/img/icon-dots.svg`}
            width={17}
            height={18}
            alt=""
          />
        </button>
      )}
    </div>
  );
};

export default Summary;
