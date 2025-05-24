import React from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/category.module.scss";
import Image from "next/image";
import { basePath } from "next.config";
import { MissionTabContext } from "@/components/todo/MissionTab";
import { MissionCategoryInfo } from "@/types/mission";

const cn = classNames.bind(scss);

interface CategoryLabelProps {
  items: MissionCategoryInfo[];
}

export const CategoryLabel = ({ items }: CategoryLabelProps) => {
  return (
    <div className={cn("category-list")}>
      <MissionTabContext.Consumer>
        {({ activeTabTypeId, setActiveTabTypeId }) => {
          return items.map((category, index) => {
            const handleChange = () => setActiveTabTypeId(category.typeId);
            const id = `category${index}`;
            return (
              <span key={id} className={cn("category")}>
                <input
                  type="radio"
                  id={id}
                  name="categoryGroup"
                  checked={activeTabTypeId === category.typeId}
                  onChange={handleChange}
                  className={cn("category-input")}
                />
                <label htmlFor={id} className={cn("category-label")}>
                  {category.typeId !== undefined && (
                    <Image
                      src={`${basePath}/img/icon-category.svg`}
                      width={12}
                      height={13}
                      alt=""
                    />
                  )}
                  {category.title}
                </label>
              </span>
            );
          });
        }}
      </MissionTabContext.Consumer>
    </div>
  );
};

export default CategoryLabel;
