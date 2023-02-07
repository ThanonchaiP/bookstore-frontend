import classnames from "classnames";
import { memo } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "store/configureStore";
import { selectCartState } from "store/slice/cartSlice";
import styled from "./index.module.scss";

type Props = {
  open: boolean;
  handleCartPopup: () => void;
};

const CartPopup = ({ open, handleCartPopup }: Props) => {
  const { cart, totalPrice } = useAppSelector(selectCartState);

  return (
    <div className={classnames(styled["cart-popup"], { [styled.active]: open })}>
      <div className={styled["cart-list"]}>
        {cart &&
          cart.cartItems.length > 0 &&
          cart.cartItems.map((item) => (
            <div className="flex items-center p-4 gap-4" key={item.id}>
              <div>
                <p className={styled["product-name"]}>{item.book.name}</p>
                <p className="font-bold">{`${item.quantity} x ฿ ${parseInt(item.book.price).toFixed(2)}`}</p>
              </div>

              <img src={item.book.image} alt={item.book.name} crossOrigin="anonymous" />
              <i className="fa-solid fa-trash text-gray-400 cursor-pointer" />
            </div>
          ))}
      </div>

      <p className="text-center font-bold py-6">ราคารวม : ฿ {totalPrice.toFixed(2)}</p>

      <Link className="block px-4" to="/user/cart" onClick={handleCartPopup}>
        <button className="w-full h-[40px] rounded-md text-white mb-6 bg-[#554994]">
          ดูรถเข็น ({cart?.cartItems.length || 0})
        </button>
      </Link>
    </div>
  );
};

export default memo(CartPopup);
