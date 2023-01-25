import classnames from "classnames";
import { FC, Fragment, memo, useCallback, useEffect, useRef, useState } from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import { Category } from "models/category";
import useOnClickOutside from "../../utils/hooks/useOnClickOutside";
import { useAppDispatch } from "../../store/configureStore";
import { setCategory } from "../../store/slice/filterSlice";
import { getAll } from "../../services/category.service";
import FilterItem from "./filter-item";
import styled from "./index.module.scss";
import PriceRange from "./price-range";

const Filter: FC<WithTranslation> = ({ t }) => {
  const filterRef = useRef(null);
  const dispatch = useAppDispatch();

  const [openMenu, setOpenMenu] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [collapsibleMenu, setCollapsibleMenu] = useState(false);

  const onChange = useCallback((value: number) => dispatch(setCategory(value)), []);

  useOnClickOutside(filterRef, () => {
    if (openMenu) {
      setOpenMenu(false);
      setCollapsibleMenu(false);
    }
  });

  useEffect(() => {
    const getCategories = async () => {
      const result = await getAll();
      setCategories(result.data);
    };

    getCategories();
  }, []);

  return (
    <Fragment>
      <div className={classnames(styled.filter, { [styled.show]: openMenu })} ref={filterRef}>
        <h1 className="text-xl font-bold p-4 mb-2">{t("filter")}</h1>
        <i className={`fa-solid fa-xmark ${styled["cancel-icon"]}`} />

        <p className="bg-gray-400 text-white px-4 py-2">{t("category")}</p>

        <div className={classnames(styled.category, { [styled.expanded]: collapsibleMenu })}>
          {categories.map((item) => (
            <FilterItem {...item} key={item.id} onChange={onChange} />
          ))}
        </div>

        {!collapsibleMenu && (
          <div className="flex items-center justify-center gap-2 mt-4 mb-6 lg:hidden">
            <p className={styled["view-more"]} onClick={() => setCollapsibleMenu(true)}>
              {t("viewMore")} <i className="fa-solid fa-chevron-down" />
            </p>
          </div>
        )}

        <PriceRange />
      </div>

      <button className={styled["btn-filter"]} onClick={() => setOpenMenu(true)}>
        <i className="hidden sm:block fa-solid fa-filter mr-2" />
        {t("filter")}
      </button>

      <div className={classnames(styled["filter-overlay"], { [styled.show]: openMenu })}></div>
    </Fragment>
  );
};

export default withTranslation()(memo(Filter));
