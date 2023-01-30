import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Book } from "models/book";
import { getProduct } from "services/product.service";
import favouriteIcon from "assets/favourite-icon.png";
import styled from "./index.module.scss";

const ProductDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [data, setData] = useState<Book>();

  const bookDetail = [
    { name: t("productDetail.releaseDate"), value: moment(data?.publishedDate).format("DD/MM/YYYY") },
    { name: t("productDetail.numberOfPages"), value: `${data?.pageNumber} ${t("productDetail.page")}` },
    { name: t("productDetail.bookCategory"), value: data?.category.name },
  ];

  useEffect(() => {
    const loadData = async () => {
      const result = await getProduct(id!);
      setData(result.data);
    };

    if (id) loadData();
  }, [id]);

  return (
    <>
      {data && (
        <div className={styled.container}>
          <div className={`${styled["detail-container"]} p-0 sm:px-8`}>
            <div className={styled["image-wrapper"]}>
              <img src={data.image} alt={data.name} crossOrigin="anonymous" />
            </div>

            <div className={`${styled.detail} sm:px-1 sm:pt-1`}>
              <h1 className={styled.detail__name}>{data.name}</h1>
              <p className={styled.detail__author}>{`${t("author")} : ${data.author.name}`}</p>

              <div className="flex items-center gap-4 order-3 sm:gap-14 sm:mb-6">
                <div className={styled.rating}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <i key={index} className="fa-regular fa-star"></i>
                  ))}
                  <p className="underline ml-2 cursor-pointer hidden sm:block">{t("productDetail.readReviews")}</p>
                </div>

                <div className="hidden items-center gap-2 sm:flex">
                  <img className={styled["favourite-icon"]} src={favouriteIcon} alt="favourite-icon" />
                  <p className="underline cursor-pointer">{t("productDetail.addToFavorites")}</p>
                </div>
              </div>

              <div className="order-[-1] mb-2 sm:order-4 sm:mb-0">
                <p className="hidden text-2xl font-semibold mb-2 sm:block">{t("productDetail.price")}</p>

                <div className="relative flex flex-col sm:gap-10 sm:flex-row sm:items-end">
                  <p className={styled.price}>
                    <i className="fa-solid fa-baht-sign mr-3" />
                    {data.price}
                  </p>

                  <div className={`${styled["detail-discount"]} mt-1 sm:mt-0 sm:flex-col`}>
                    <span className="hidden sm:block">ราคาปกติ</span>
                    <p className="text-xl line-through ">
                      <i className="fa-solid fa-baht-sign mr-3 sm:hidden" />
                      500.00
                    </p>

                    <p className="text-xl ml-3 sm:hidden">-15%</p>
                  </div>

                  <p className={`${styled["discount-percent"]} hidden sm:block`}>ประหยัด 15%</p>

                  <div className="absolute flex flex-col items-center right-[20px] top-[20%] sm:hidden">
                    <img
                      className="grayscale-[1] opacity-[0.2] hover:opacity-[1] hover:grayscale-0"
                      src={favouriteIcon}
                      alt="favourite-icon"
                    />
                    <p className="text-sm">{t("productDetail.like")}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-6 order-5">
                <button className={styled["btn-buy-now"]} type="button">
                  {t("productDetail.buyNow")}
                </button>
                <button className={styled["btn-add-to-cart"]} type="button">
                  {t("productDetail.addToCart")}
                </button>
              </div>

              <div className={styled["social-media"]}>
                <p className="font-semibold text-lg">Share in social media :</p>
                <i className="fa-brands fa-facebook-f"></i>
                <i className="fa-brands fa-twitter"></i>
                <i className="fa-brands fa-line"></i>
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-8 sm:m-8 sm:p-8 rounded-md shadow-md sm:flex-row">
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
        </div>
      )}
    </>
  );
};

export default ProductDetail;
