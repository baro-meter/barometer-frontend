import React from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/status.module.scss";
import Image from "next/image";
import { basePath } from "next.config";

const cn = classNames.bind(scss);

export interface StatusOption {
  status: "excellent" | "good" | "insufficient" | "poor";
  statusText: "완벽했어요" | "적당해요" | "노력했어요" | "못했어요";
}

export interface StatusLabelProps {
  options: StatusOption[];
  checkedIndex?: number;
  onChange?: (index: number) => void;
}

export const StatusLabel = ({ options, checkedIndex, onChange }: StatusLabelProps) => {
  return (
    <div className={cn("status-list")}>
      {options.map((option, index) => (
        <span key={index} className={cn("status")}>
          <input
            type="radio"
            id={`status${index}`}
            name="status"
            checked={checkedIndex === index}
            onChange={() => onChange && onChange(index)}
            className={cn("status-input")}
          />
          <label 
            htmlFor={`status${index}`}
            className={cn("status-label")}
          >
            <span className={cn("img-wrap")}>
              <Image
                src={`${basePath}/img/icon-${option.status}.svg`}
                width={18}
                height={18}
                alt={option.statusText}
              />
            </span>
            <p className={cn("text")}>{option.statusText}</p>
          </label>
        </span>
      ))}
    </div>
  );
};

export default StatusLabel;
