import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "store/configureStore";
import { selectCartState } from "store/slice/cartSlice";

const CartSummary = () => {
  const { t } = useTranslation();
  const { selected } = useAppSelector(selectCartState);

  const getSelectedPrice = useCallback(() => {
    return selected.reduce((sum, item) => sum + item.quantity * +item.book.price, 0);
  }, [selected]);

  const totalPrice = selected.length < 1 ? Number(0).toFixed(2) : (getSelectedPrice() + 30).toFixed(2);
  return (
    <div className="rounded-md shadow-md p-4 xl:ml-8">
      <p className="text-base font-medium pb-2 border-b-2">{t("cart.orderSummary")}</p>

      <div className="flex justify-between items-center mt-4">
        <p>{t("cart.productPrice")}</p>
        <p className="font-bold text-[#554994]">
          <i className="fa-solid fa-baht-sign mr-1" />
          {getSelectedPrice().toFixed(2)}
        </p>
      </div>

      <div className="flex justify-between items-center mt-2">
        <p>{t("cart.shippingFee")}</p>
        <p className="font-bold text-[#554994]">
          <i className="fa-solid fa-baht-sign mr-1" />
          30.00
        </p>
      </div>

      <div className="flex justify-between items-center mt-6">
        <p className="text-lg font-bold">{t("cart.total")}</p>
        <p className="text-2xl font-bold text-red-600">
          <i className="fa-solid fa-baht-sign mr-1" />
          {totalPrice}
        </p>
      </div>

      <button type="button" className="w-full h-[40px] text-base font-medium rounded-md bg-[#554994] text-white mt-4">
        {t("cart.payment")}
      </button>
    </div>
  );
};

export default memo(CartSummary);
