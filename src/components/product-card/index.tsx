import classnames from "classnames";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Product } from "models/product";
import { useAppDispatch, useAppSelector } from "store/configureStore";
import { setOpenLoginPopup } from "store/slice/accountSlice";
import { addToCartAsync } from "store/slice/cartSlice";
import { addFavoriteAsync, removeFavoriteAsync } from "store/slice/favoriteSlice";
import favouriteIcon from "assets/favourite-icon.png";
import styles from "./index.module.scss";

type Props = {
  data: Product;
  className?: string;
  display?: "column" | "list";
};

function ProductCard({ data, className = "", display = "column" }: Props) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { favorites } = useAppSelector((state) => state.favorite);
  const { id, name, author, category, price, image, publisher } = data;
  const favoritActive = favorites.find((item) => item.book.id === id);

  const addToCart = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (!localStorage.getItem("user")) {
      dispatch(setOpenLoginPopup(true));
      return;
    }

    dispatch(addToCartAsync({ bookId: id, quantity: 1 }));
  };

  const handleClickFavorite = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (favoritActive) dispatch(removeFavoriteAsync({ favoriteId: favoritActive.id }));
    else dispatch(addFavoriteAsync({ bookId: id }));
  };

  return (
    <div className={classnames(styles["product-card"], { [className]: className })}>
      {display === "column" ? (
        <Link to={`/product-detail/${id}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-book text-gray-500" />
              <p className="text-sm text-gray-500 font-semibold">{category.name}</p>
            </div>
            <img
              className={classnames(styles["favorite-icon"], { [styles["favorite-active"]]: favoritActive })}
              src={favouriteIcon}
              alt="favourite-icon"
              width={24}
              height={24}
              onClick={handleClickFavorite}
            />
          </div>

          <div className={styles["product-card__image"]}>
            <img src={image} alt={name} crossOrigin="anonymous" loading="lazy" />
          </div>

          <p className={styles["product-card__name"]}>{name}</p>
          <p className={styles["product-card__author"]}>{`${t("author")} : ${author.name}`}</p>

          <div className="flex items-center gap-4 mb-4 sm:mb-6">
            <p className={`flex items-center gap-2 ${styles.price}`}>฿ {price}</p>
          </div>

          <button type="button" className={styles["btn-add"]} onClick={addToCart}>
            {t("addToCart")}
          </button>
        </Link>
      ) : (
        <Link to={`/product-detail/${id}`}>
          <div className={styles["list-wrapper"]}>
            <div className={`${styles["product-card__image"]} ${styles["m-0"]}`}>
              <img src={image} alt={name} crossOrigin="anonymous" loading="lazy" />
            </div>

            <div className="pr-4 ml-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-book text-gray-500" />
                  <p className="text-sm text-gray-500 font-semibold">{category.name}</p>
                </div>
                <img
                  className={classnames(styles["favorite-icon"], { [styles["favorite-active"]]: favoritActive })}
                  src={favouriteIcon}
                  alt="favourite-icon"
                  width={24}
                  height={24}
                  onClick={handleClickFavorite}
                />
              </div>

              <p className={`${styles["list-name"]}`}>{name}</p>
              <p>{`${t("author")} : ${author.name}`}</p>
              <p className="mt-2">{`${t("publisher")} : ${publisher.name}`}</p>
            </div>

            <div className={styles["list-action"]}>
              <div className="flex items-center gap-4 mb-6">
                <p className="text-lg font-bold">ราคา</p>
                <p className={`flex items-center gap-2 ${styles.price}`}>฿ {price}</p>
              </div>

              <button type="button" className={styles["btn-add"]} onClick={addToCart}>
                {t("addToCart")}
              </button>
              <p className="mt-4 text-center">{t("readMore")}</p>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}

export default memo(ProductCard);
