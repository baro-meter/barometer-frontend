import React from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/title.module.scss";

const cn = classNames.bind(scss);

export interface TitleProps {
  title: string;
  titleType: 'full' | 'basic' | 'sub' | 'setting' ;
  description?: string;
}

export const Title = ({ title, titleType = 'full', description }: TitleProps) => {
  return (
    <div className={cn("title-wrap", `title-wrap-${titleType}`)}>
      <h2 className={cn("title")}>{title}</h2>
      {description && 
        <p className={cn("description")}>{description}</p>
      }
    </div>
  );
};

export default Title;
