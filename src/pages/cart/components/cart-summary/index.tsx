import { toast } from "react-toastify";
import { memo, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/configureStore";
import { clearSelectItem, fetchCartAsync, selectCartState } from "store/slice/cartSlice";
import { createOrder } from "@/services/order.service";

const CartSummary = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cart, selected } = useAppSelector(selectCartState);

  const getSelectedPrice = useCallback(() => {
    return selected.reduce((sum, item) => sum + item.quantity * +item.book.price, 0);
  }, [selected]);

  const shippingFee = 0;
  const totalPrice = selected.length < 1 ? Number(0).toFixed(2) : (getSelectedPrice() + shippingFee).toFixed(2);

  const onCheckout = async () => {
    try {
      if (selected.length < 1 || !cart) return;

      let selectedPayload = [];
      let totalQty = 0,
        totalPrice = 0;

      for (const item of selected) {
        totalQty += item.quantity;
        totalPrice += item.quantity * +item.book.price;
        selectedPayload.push({ quantity: item.quantity, book: { id: item.book.id }, cartItemId: item.id });
      }

      const payload = {
        cartId: cart.id,
        totalQty,
        totalPrice,
        items: selectedPayload,
        shippingFee,
        orderDate: new Date(),
      };
      await createOrder(payload);
      dispatch(fetchCartAsync());

      navigate("/user/order");
      toast.success("Success!");
    } catch (error) {
      console.log(error);
    }
  };

  const clearSelect = () => {
    dispatch(clearSelectItem());
    return;
  };

  useEffect(() => () => clearSelect(), []);

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
          {shippingFee.toFixed(2)}
        </p>
      </div>

      <div className="flex justify-between items-center mt-6">
        <p className="text-lg font-bold">{t("cart.total")}</p>
        <p className="text-2xl font-bold text-red-600">
          <i className="fa-solid fa-baht-sign mr-1" />
          {totalPrice}
        </p>
      </div>

      <button
        type="button"
        className="w-full h-[40px] text-base font-medium rounded-md bg-[#554994] text-white mt-4"
        onClick={onCheckout}
      >
        {t("cart.payment")}
      </button>
    </div>
  );
};

export default memo(CartSummary);
