import React from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/category.module.scss";
import Image from "next/image";
import { basePath } from "next.config";
import { RoundTabContext } from "@/components/tab/RoundTab";

const cn = classNames.bind(scss);

export interface CategoryItem {
  text: string;
  iconType?: boolean;
}

export interface CategoryLabelProps {
  categories: CategoryItem[];
}

/**
 * TODO
 * - categories도 내가 들고 있을거라 그냥 고정으로 여기 넣기
 */
export const CategoryLabel = ({ categories }: CategoryLabelProps) => {
  return (
    <div className={cn("category-list")}>
      <RoundTabContext.Consumer>
        {({ activeTabIdx, setActiveTabIdx }) => {
          return categories.map((category, index) => {
            const handleChange = () => setActiveTabIdx(index);
            const id = `category${index}`;
            return (
              <span key={id} className={cn("category")}>
                <input
                  type="radio"
                  id={id}
                  name="categoryGroup"
                  checked={activeTabIdx === index}
                  onChange={handleChange}
                  className={cn("category-input")}
                />
                <label htmlFor={id} className={cn("category-label")}>
                  {category.iconType && (
                    <Image
                      src={`${basePath}/img/icon-category.svg`}
                      width={12}
                      height={13}
                      alt=""
                    />
                  )}
                  {category.text}
                </label>
              </span>
            );
          });
        }}
      </RoundTabContext.Consumer>
    </div>
  );
};

export default CategoryLabel;
