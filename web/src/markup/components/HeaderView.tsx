import React from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/header.module.scss";
import Image from "next/image";
import { basePath } from "next.config";

const cn = classNames.bind(scss);

export interface HeaderViewProps {
  headerType: "basic" | "back" | "onlyBack" | "progress" | "titleWithOption";
  progressWidth?: number;
  titleText?: string;
}

const HeaderView = ({
  headerType,
  progressWidth,
  titleText
}: HeaderViewProps) => {
  return (
    <>
      {(headerType === "basic" || headerType === "back" || headerType === "onlyBack" || headerType === "titleWithOption") && (
        <header className={cn("header")}>
          <div className={cn("inner")}>
            {(headerType === "back" || headerType === "onlyBack") && (
              <button type="button" className={cn("btn-back")} aria-label="뒤로가기">
                <Image
                  src={`${basePath}/img/icon-back.svg`}
                  width={10}
                  height={18}
                  alt={""}
                />
              </button>
            )}
            {(headerType !== "onlyBack") && (
              <h1 className={cn("title")}>{titleText}</h1>
            )}
            {(headerType === "titleWithOption") && (
              <button type="button" className={cn("btn-more")} aria-label="옵션 (수정/삭제)">
                <Image
                  src={`${basePath}/img/icon-dots.svg`}
                  width={17}
                  height={18}
                  alt={""}
                />
              </button>
            )}
          </div>
        </header>
      )}

      {headerType === "progress" && (
        <header className={cn("progress-header")}>
          <div className={cn("inner")}>
            <div className={cn("progress")}>
              <div
                className={cn("progress-bar")}
                role="progressbar"
                aria-valuenow={progressWidth}
                aria-valuemin={0}
                aria-valuemax={100}
                style={{ width: `${progressWidth}%` }}
              ></div>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default HeaderView;
