import React, { createContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/category.module.scss";
import Image from "next/image";
import { basePath } from "next.config";
import { GoalCategoryType, GoalTypeId } from "@/types/goal";

const cn = classNames.bind(scss);

interface CategoryLabelProps {
  items: GoalCategoryType[];
}

export const CategoryLabel = ({ items }: CategoryLabelProps) => {
  const [activeTabTypeId, setActiveTabTypeId] = useState<
    GoalTypeId | undefined
  >();

  return (
    <CategoryLabelContext.Provider
      value={{ activeTabTypeId, setActiveTabTypeId }}
    >
      <div className={cn("category-list")}>
        <CategoryLabelContext.Consumer>
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
                    {category.text}
                  </label>
                </span>
              );
            });
          }}
        </CategoryLabelContext.Consumer>
      </div>
    </CategoryLabelContext.Provider>
  );
};

export default CategoryLabel;

interface CategoryLabelContextType {
  activeTabTypeId: GoalTypeId | undefined;
  setActiveTabTypeId: (typeId: GoalTypeId | undefined) => void;
}

export const CategoryLabelContext = createContext<CategoryLabelContextType>({
  activeTabTypeId: undefined,
  setActiveTabTypeId: () => {},
});
