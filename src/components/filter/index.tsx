import classnames from "classnames";
import { FC, Fragment, memo, useCallback, useRef, useState } from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "store/configureStore";
import { setCategory } from "store/slice/filterSlice";
import { selectCategoryState } from "store/slice/categorySlice";
import useOnClickOutside from "utils/hooks/useOnClickOutside";
import FilterItem from "./filter-item";
import styles from "./index.module.scss";
import PriceRange from "./price-range";

const Filter: FC<WithTranslation> = ({ t }) => {
  const filterRef = useRef(null);
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(selectCategoryState);

  const [openMenu, setOpenMenu] = useState(false);
  const [collapsibleMenu, setCollapsibleMenu] = useState(false);

  const onChange = useCallback((value: number) => dispatch(setCategory(value)), []);

  useOnClickOutside(filterRef, () => {
    if (openMenu) {
      setOpenMenu(false);
      setCollapsibleMenu(false);
    }
  });

  return (
    <Fragment>
      <div className={classnames(styles.filter, { [styles.show]: openMenu })} ref={filterRef}>
        <h1 className="text-xl font-bold p-4 mb-2">{t("filter")}</h1>
        <i className={`fa-solid fa-xmark ${styles["cancel-icon"]}`} />

        <p className="bg-gray-400 text-white px-4 py-2">{t("category")}</p>

        <div className={classnames(styles.category, { [styles.expanded]: collapsibleMenu })}>
          {categories.length > 0 &&
            categories.map((item) => <FilterItem {...item} key={item.id} onChange={onChange} />)}
        </div>

        {!collapsibleMenu && (
          <div className="flex items-center justify-center gap-2 mt-4 mb-6 lg:hidden">
            <p className={styles["view-more"]} onClick={() => setCollapsibleMenu(true)}>
              {t("viewMore")} <i className="fa-solid fa-chevron-down" />
            </p>
          </div>
        )}

        <PriceRange />
      </div>

      <button className={styles["btn-filter"]} onClick={() => setOpenMenu(true)}>
        <i className="hidden sm:block fa-solid fa-filter mr-2" />
        {t("filter")}
      </button>

      <div className={classnames(styles["filter-overlay"], { [styles.show]: openMenu })}></div>
    </Fragment>
  );
};

export default withTranslation()(memo(Filter));
