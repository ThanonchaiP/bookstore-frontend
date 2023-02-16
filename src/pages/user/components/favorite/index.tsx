import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/configureStore";
import { removeFavoriteAsync } from "store/slice/favoriteSlice";
import { addToCartAsync } from "store/slice/cartSlice";
import notFoundImage from "assets/not-product.svg";
import styles from "./index.module.scss";

const Favorite = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state) => state.favorite);

  const addToCart = async (bookId: string) => dispatch(addToCartAsync({ bookId, quantity: 1 }));
  const removeFavoriteItem = async (favoriteId: string) => dispatch(removeFavoriteAsync({ favoriteId }));

  return (
    <div className="rounded-md md:shadow-lg md:p-4">
      <h1 className="text-lg font-medium md:mb-8">{t("favorite.myWishlist")}</h1>

      {favorites.length > 0 ? (
        <div className="flex flex-col gap-4">
          {favorites.length > 0 &&
            favorites.map((item) => (
              <Row className="p-4 rounded-md shadow-md md:shadow-sm" key={item.id}>
                <Col span={24} md={3} className="py-[10px] h-[100px] rounded-md bg-[#F8F9FA] text-center">
                  <img
                    className="h-[80px] mx-auto"
                    src={item.book.image}
                    alt={item.book.name}
                    crossOrigin="anonymous"
                  />
                </Col>

                <Col span={24} md={16} className="mt-4 md:mt-0 md:pl-8 md:pr-5">
                  <Link to={`/product-detail/${item.book.id}`}>
                    <h4 className="text-base font-bold">{item.book.name}</h4>
                  </Link>
                  <h5 className="text-base">{`${t("author")} : ${item.book.author.name}`}</h5>
                  <h5 className="text-base">{`${t("publisher")} : ${item.book.publisher.name}`}</h5>
                  <span className="flex justify-center items-center w-[64px] h-[16px] text-xs text-white bg-[#554994] rounded-md">
                    {t("favorite.book")}
                  </span>
                </Col>

                <Col span={24} md={5} className="mt-4 md:mt-0">
                  <div className="flex items-center justify-between flex-wrap mb-4">
                    <h4 className="text-lg font-bold">{t("favorite.price")}</h4>
                    <h4 className="text-xl font-bold text-[#554994]">฿ {item.book.price}</h4>
                  </div>
                  <button className={styles["btn-add"]} onClick={() => addToCart(item.book.id)}>
                    {t("addToCart")}
                  </button>
                  <button className={styles["btn-remove"]} onClick={() => removeFavoriteItem(item.id)}>
                    {t("favorite.remove")}
                  </button>
                </Col>
              </Row>
            ))}
        </div>
      ) : (
        <>
          <img className="mx-auto" src={notFoundImage} alt="not found" />
          <h3 className="text-2xl font-semibold text-center text-[#554994] my-5">{t("favorite.notFoundMessage")}</h3>
          <Link to="/products-filter" className="block text-center md:pb-10">
            <button className="btn-primary mt-3">{t("cart.shoppingNow")}</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Favorite;
