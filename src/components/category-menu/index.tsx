import { FC, memo } from "react";
import Slider from "react-slick";
import { withTranslation, WithTranslation } from "react-i18next";
import { NextArrow, PrevArrow } from "../carousel";
import styled from "./index.module.scss";

const CategoryMenu: FC<WithTranslation> = ({ t }) => {
  const categories = [
    { id: 1, name: "นิยาย1" },
    { id: 2, name: "นิยาย2" },
    { id: 3, name: "นิยาย3" },
    { id: 4, name: "นิยาย4" },
    { id: 5, name: "นิยาย5" },
    { id: 6, name: "นิยาย6" },
    { id: 7, name: "นิยาย7" },
    { id: 8, name: "นิยาย8" },
    { id: 9, name: "นิยาย9" },
    { id: 10, name: "นิยาย10" },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="py-8">
      <h1 className="text-3xl font-semibold mb-5">{t("category")}</h1>
      <Slider {...settings} className="gap-4">
        {categories.map((item) => (
          <div key={item.id} className="px-2">
            <div className={styled.category__card}>
              <img className="mx-auto" src="https://api.chulabook.com/images/1582051123017.svg" alt="" />
              <p className="text-center font-semibold">{item.name}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default withTranslation()(memo(CategoryMenu));
