import { FC, memo } from "react";
import { Link } from "react-router-dom";
import Slider, { Settings } from "react-slick";
import { withTranslation, WithTranslation } from "react-i18next";
import { NextArrow, PrevArrow } from "components/carousel";
import { useAppSelector } from "store/configureStore";
import { selectCategoryState } from "store/slice/categorySlice";
import styled from "./index.module.scss";

const CategoryMenu: FC<WithTranslation> = ({ t }) => {
  const { categories } = useAppSelector(selectCategoryState);

  const settings: Settings = {
    dots: false,
    infinite: false,
    draggable: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className={styled.category__container}>
      <h1 className="text-xl md:text-3xl font-semibold mb-9">{t("category")}</h1>

      {categories.length > 0 && (
        <Slider {...settings}>
          {categories.map((item) => (
            <div key={item.id} className="px-2">
              <Link to={`category/${item.id}`} className={styled.category__card}>
                <img className="mx-auto" src={item.image} alt={item.name} crossOrigin="anonymous" loading="lazy" />
                <p className="text-center font-semibold">{item.name}</p>
              </Link>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default withTranslation()(memo(CategoryMenu));
