import { Category } from "models/category";
import { FC, memo, useEffect, useState } from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import { useAppDispatch } from "../../store/configureStore";
import { setCategory } from "../../slice/filterSlice";
import { getAll } from "../../services/category.service";
import FilterItem from "./filter-item";
import styled from "./index.module.scss";
import PriceRange from "./price-range";

const Filter: FC<WithTranslation> = ({ t }) => {
  const dispatch = useAppDispatch();
  const [categories, setCategories] = useState<Category[]>([]);

  const onChange = (value: number) => dispatch(setCategory(value));

  useEffect(() => {
    const getCategories = async () => {
      const result = await getAll();
      setCategories(result.data);
    };

    getCategories();
  }, []);

  return (
    <div className={styled.filter}>
      <h1 className="text-xl font-bold p-4 mb-2">{t("filter")}</h1>

      <p className="bg-gray-400 text-white px-4 py-2">{t("category")}</p>

      <div className={styled.category}>
        {categories.map((item) => (
          <FilterItem {...item} key={item.id} onChange={(value) => onChange(value)} />
        ))}
      </div>

      <PriceRange />
    </div>
  );
};

export default withTranslation()(memo(Filter));
