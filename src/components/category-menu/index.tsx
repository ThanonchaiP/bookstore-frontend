import { FC, memo, useCallback, useState } from "react";
import Slider, { Settings } from "react-slick";
import { withTranslation, WithTranslation } from "react-i18next";
import { NextArrow, PrevArrow } from "../carousel";
import { useAppSelector } from "../../store/configureStore";
import { selectCategoryState } from "../../store/slice/categorySlice";
import styled from "./index.module.scss";

const CategoryMenu: FC<WithTranslation> = ({ t }) => {
  const { categories } = useAppSelector(selectCategoryState);

  const [dragging, setDragging] = useState(false);

  const handleBeforeChange = useCallback(() => {
    setDragging(true);
  }, [setDragging]);

  const handleAfterChange = useCallback(() => {
    setDragging(false);
  }, [setDragging]);

  const onClickCard = useCallback(
    (categoryId: number) => (e: React.SyntheticEvent) => {
      if (dragging) {
        e.stopPropagation();
        return;
      }

      console.log("categoryId : ", categoryId);
    },
    [dragging]
  );

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    lazyLoad: "progressive",
    beforeChange: handleBeforeChange,
    afterChange: handleAfterChange,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2.1,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="py-8">
      <h1 className="text-xl md:text-3xl font-semibold mb-5">{t("category")}</h1>
      {categories.length > 0 && (
        <Slider {...settings} className="gap-4">
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
