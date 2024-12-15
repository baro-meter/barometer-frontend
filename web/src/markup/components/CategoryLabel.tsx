import React from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/category.module.scss";
import Image from "next/image";
import { basePath } from "next.config";
import { CategoryTabContext } from "@/components/tab/CategoryTab";
import { useCategory } from "@/hooks/useCategory";

const cn = classNames.bind(scss);

export const CategoryLabel = () => {
  //  categories 정의 프론트 단에서 const로 들고 있어서 고정값으로 들고옴
  const { getCategoryLableItems } = useCategory();
  return (
    <div className={cn("category-list")}>
      <CategoryTabContext.Consumer>
        {({ activeTabTypeId, setActiveTabTypeId }) => {
          return getCategoryLableItems().map((category, index) => {
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
      </CategoryTabContext.Consumer>
    </div>
  );
};

export default CategoryLabel;
