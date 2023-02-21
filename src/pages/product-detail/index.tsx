import classnames from "classnames";
import RatingStar from "components/rating-star";
import favouriteIcon from "assets/favourite-icon.png";
import { useProductDetailViewModel } from "./ViewModel";
import Review from "./components/Review";
import styles from "./index.module.scss";

const ProductDetail = () => {
  const { data, review, favoriteActive, bookDetail, t, addToCart, buyNow, handleFavorite, scrollToReview } =
    useProductDetailViewModel();

  return (
    <>
      {data && review && (
        <div className={styles.container}>
          <div className={`${styles["detail-container"]} p-0 sm:px-8`}>
            <div className={styles["image-wrapper"]}>
              <img src={data.image} alt={data.name} crossOrigin="anonymous" />
            </div>

            <div className={`${styles.detail} sm:px-1 sm:pt-1`}>
              <h1 className={styles.detail__name}>{data.name}</h1>
              <p className={styles.detail__author}>{`${t("author")} : ${data.author.name}`}</p>

              <div className="flex items-center gap-4 order-3 sm:gap-14 sm:mb-6">
                <div className={styles.rating}>
                  <RatingStar rating={review.ratingAvg || 0} className="sm:text-[22px]" />
                  <p className="underline ml-2 cursor-pointer hidden sm:block" onClick={scrollToReview}>
                    {t("productDetail.readReviews")}
                  </p>
                </div>

                <div className="hidden items-center gap-2 sm:flex" onClick={handleFavorite}>
                  <img
                    className={classnames(styles["favourite-icon"], { [styles["favourite-active"]]: favoriteActive })}
                    src={favouriteIcon}
                    alt="favourite-icon"
                  />
                  <p className="underline cursor-pointer">
                    {favoriteActive ? t("productDetail.removeFavorites") : t("productDetail.addToFavorites")}
                  </p>
                </div>
              </div>

              <div className="order-[-1] mb-2 sm:order-4 sm:mb-0">
                <p className="hidden text-2xl font-semibold mb-2 sm:block">{t("productDetail.price")}</p>

                <div className="relative flex flex-col sm:gap-10 sm:flex-row sm:items-end">
                  <p className={styles.price}>
                    <i className="fa-solid fa-baht-sign mr-3" />
                    {data.price}
                  </p>

                  <div className={`${styles["detail-discount"]} mt-1 sm:mt-0 sm:flex-col`}>
                    <span className="hidden sm:block">ราคาปกติ</span>
                    <p className="text-xl line-through ">
                      <i className="fa-solid fa-baht-sign mr-3 sm:hidden" />
                      {data.price}
                    </p>

                    <p className="text-xl ml-3 sm:hidden">-15%</p>
                  </div>

                  <p className={`${styles["discount-percent"]} hidden sm:block`}>ประหยัด 0%</p>

                  <div className="absolute flex flex-col items-center right-[20px] top-[20%] sm:hidden">
                    <img
                      className={classnames(styles["favourite-icon"], { [styles["favourite-active"]]: favoriteActive })}
                      src={favouriteIcon}
                      alt="favourite-icon"
                      onClick={handleFavorite}
                    />
                    <p className="text-sm">{favoriteActive ? t("productDetail.unlike") : t("productDetail.like")}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-6 order-5">
                <button className={styles["btn-buy-now"]} type="button" onClick={buyNow}>
                  {t("productDetail.buyNow")}
                </button>
                <button className={styles["btn-add-to-cart"]} type="button" onClick={addToCart}>
                  {t("productDetail.addToCart")}
                </button>
              </div>

              <div className={styles["social-media"]}>
                <p className="font-semibold text-lg">Share in social media :</p>
                <i className="fa-brands fa-facebook-f"></i>
                <i className="fa-brands fa-twitter"></i>
                <i className="fa-brands fa-line"></i>
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-8 sm:m-8 sm:p-8 rounded-md sm:shadow-md sm:flex-row">
            <div className="sm:min-w-[270px] md:min-w-[350px]">
              <h5 className="font-semibold mb-4">{t("productDetail.bookInfo")}</h5>
              <div className="flex flex-col justify-center gap-1 sm:gap-3">
                {bookDetail.map((item, index) => (
                  <p key={index}>
                    <i className="fa-solid fa-chevron-right mr-4 font-bold text-purple-700" />
                    {`${item.name} : ${item.value}`}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-5 sm:mt-0">
              <h5 className="font-semibold mb-4">{`${t("productDetail.productDetails")} : ${data.name}`}</h5>
              <p className="leading-relaxed">{data.description}</p>
            </div>
          </div>
          <Review data={review} />
        </div>
      )}
    </>
  );
};

export default ProductDetail;
