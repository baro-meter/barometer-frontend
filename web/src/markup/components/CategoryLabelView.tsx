import React from "react";
import classNames from "classnames/bind";
import scss from "@/styles/components/category.module.scss";
import Image from "next/image";
import { basePath } from "next.config";

const cn = classNames.bind(scss);

export interface CategoryItem {
  text: string;
  checked?: boolean;
  iconType?: boolean;
}

export interface CategoryLabelProps {
  categories: CategoryItem[];
  onChange: (id: string) => void;
}

export const CategoryLabel = ({ categories, onChange }: CategoryLabelProps) => {
  return (
    <div className={cn("category-list")}>
      {categories.map((category, index) => {
        const id = `category${index}`;
        return (
          <span key={id} className={cn("category")}>
            <input
              type="radio"
              id={id}
              name="categoryGroup"
              checked={category.checked}
              onChange={() => onChange(id)} 
              className={cn("category-input")}
            />
            <label 
              htmlFor={id}
              className={cn("category-label")}
            >
              {category.iconType && 
                <Image
                  src={`${basePath}/img/icon-category.svg`}
                  width={12}
                  height={13}
                  alt=""
                />
              }
              {category.text}
            </label>
          </span>
        );
      })}
    </div>
  );
};

export default CategoryLabel;
