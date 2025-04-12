import React from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/title.module.scss";

const cn = classNames.bind(scss);

export interface TitleProps {
  title: string;
  titleType: "full" | "basic" | "sub" | "setting";
  description?: string;
  allowHtml?: boolean; // HTML 태그 허용 여부
}

export const Title = ({
  title,
  titleType = "full",
  description,
  allowHtml = false,
}: TitleProps) => {
  return (
    <div className={cn("title-wrap", `title-wrap-${titleType}`)}>
      {allowHtml ? (
        <h2
          className={cn("title")}
          dangerouslySetInnerHTML={{ __html: title }}
        />
      ) : (
        <h2 className={cn("title")}>{title}</h2>
      )}

      {description &&
        (allowHtml ? (
          <p
            className={cn("description")}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        ) : (
          <p className={cn("description")}>{description}</p>
        ))}
    </div>
  );
};

export default Title;
