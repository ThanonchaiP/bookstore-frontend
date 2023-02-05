import { FC, memo } from "react";
import Slider from "react-slick";
import { withTranslation, WithTranslation } from "react-i18next";
import { useAppSelector } from "store/configureStore";
import { selectCategoryState } from "store/slice/categorySlice";
import { useCategoryMenuViewModel } from "./VIewModel";
import styled from "./index.module.scss";

const CategoryMenu: FC<WithTranslation> = ({ t }) => {
  const { categories } = useAppSelector(selectCategoryState);
  const { settings, onClickCard } = useCategoryMenuViewModel();

  return (
    <div className={styled.category__container}>
      <h1 className="text-xl md:text-3xl font-semibold mb-9">{t("category")}</h1>

      {categories.length > 0 && (
        <Slider {...settings}>
          {categories.map((item) => (
            <div key={item.id} className="px-2" onClick={onClickCard(item.id)}>
              <div className={styled.category__card}>
                <img className="mx-auto" src={item.image} alt={item.name} crossOrigin="anonymous" loading="lazy" />
                <p className="text-center font-semibold">{item.name}</p>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default withTranslation()(memo(CategoryMenu));
