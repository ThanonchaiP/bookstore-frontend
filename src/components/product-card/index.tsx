import classnames from "classnames";
import { memo, Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Product } from "models/product";
import styled from "./index.module.scss";
import favouriteIcon from "../../assets/favourite-icon.png";

type Props = {
  data: Product;
  className?: string;
  display?: "column" | "list";
};

function ProductCard({ data, className = "", display }: Props) {
  const { t } = useTranslation();
  const { name, author, category, price, image, publisher } = data;

  return (
    <div className={classnames(styled["product-card"], { [className]: className })}>
      {display === "column" ? (
        <Fragment>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-book text-gray-500" />
              <p className="text-sm text-gray-500 font-semibold">{category.name}</p>
            </div>
            <img className={styled["favorite-icon"]} src={favouriteIcon} alt="favourite-icon" width={24} height={24} />
          </div>

          <img className={styled["product-card__image"]} src={image} alt={name} crossOrigin="anonymous" />
          <p className={styled["product-card__name"]}>{name}</p>
          <p className={styled["product-card__author"]}>{`${t("author")} : ${author.name}`}</p>

          <div className="flex items-center gap-4 mb-6">
            <p className={`flex items-center gap-2 ${styled.price}`}>฿ {price}</p>
          </div>

          <button type="button" className={styled["btn-add"]}>
            {t("addToCart")}
          </button>
        </Fragment>
      ) : (
        <Fragment>
          <div className={styled["list-wrapper"]}>
            <img className={styled["product-card__image"]} src={image} alt={name} crossOrigin="anonymous" />

            <div className="pr-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-book text-gray-500" />
                  <p className="text-sm text-gray-500 font-semibold">{category.name}</p>
                </div>
                <img
                  className={styled["favorite-icon"]}
                  src={favouriteIcon}
                  alt="favourite-icon"
                  width={24}
                  height={24}
                />
              </div>

              <p className={`${styled["list-name"]}`}>{name}</p>
              <p>{`${t("author")} : ${author.name}`}</p>
              <p className="mt-2">{`${t("publisher")} : ${publisher.name}`}</p>
            </div>

            <div className={styled["list-action"]}>
              <div className="flex items-center gap-4 mb-6">
                <p className="text-lg font-bold">ราคา</p>
                <p className={`flex items-center gap-2 ${styled.price}`}>฿ {price}</p>
              </div>

              <button type="button" className={styled["btn-add"]}>
                {t("addToCart")}
              </button>
              <p className="mt-4 text-center">{t("readMore")}</p>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default memo(ProductCard);
