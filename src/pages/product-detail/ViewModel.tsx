import moment from "moment";
import { useState, useEffect } from "react";
import { Book } from "@/models/book";
import { getProduct } from "@/services/product.service";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/configureStore";
import { userSelector, setOpenLoginPopup } from "store/slice/accountSlice";
import { addToCartAsync } from "store/slice/cartSlice";
import { removeFavoriteAsync, addFavoriteAsync } from "store/slice/favoriteSlice";

export function useProductDetailViewModel() {
  const { id } = useParams();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(userSelector);
  const { favorites } = useAppSelector((state) => state.favorite);
  const [data, setData] = useState<Book>();
  const favoriteActive = data ? favorites.find((item) => item.book.id === data.id) : undefined;

  const bookDetail = [
    { name: t("productDetail.releaseDate"), value: moment(data?.publishedDate).format("DD/MM/YYYY") },
    { name: t("productDetail.numberOfPages"), value: `${data?.pageNumber} ${t("productDetail.page")}` },
    { name: t("productDetail.bookCategory"), value: data?.category.name },
  ];

  const handleFavorite = async () => {
    if (!user) {
      dispatch(setOpenLoginPopup(true));
      return;
    }

    if (favoriteActive) dispatch(removeFavoriteAsync({ favoriteId: favoriteActive.id }));
    else dispatch(addFavoriteAsync({ bookId: data!.id }));
  };

  const addToCart = async () => {
    if (!user) {
      dispatch(setOpenLoginPopup(true));
      return;
    }

    dispatch(addToCartAsync({ bookId: data!.id, quantity: 1 }));
  };

  const buyNow = async () => {
    if (!user) {
      dispatch(setOpenLoginPopup(true));
      return;
    }

    await dispatch(addToCartAsync({ bookId: data!.id, quantity: 1, buyNow: true }));
    navigate("/user/cart");
  };

  useEffect(() => {
    const loadData = async () => {
      const result = await getProduct(id!);
      setData(result.data);
    };

    if (id) loadData();
  }, [id]);

  return { data, bookDetail, favoriteActive, t, handleFavorite, addToCart, buyNow };
}
