import classnames from "classnames";
import { memo } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/configureStore";
import { removeCartItemAsync, selectCartState } from "store/slice/cartSlice";
import Button from "components/button";
import styles from "./index.module.scss";

type Props = {
  open: boolean;
  handleCartPopup: () => void;
};

const CartPopup = ({ open, handleCartPopup }: Props) => {
  const dispatch = useAppDispatch();
  const { cart, totalPrice } = useAppSelector(selectCartState);

  const removeItem = (cartItemId: string) => dispatch(removeCartItemAsync({ cartItemId }));

  return (
    <div className={classnames(styles["cart-popup"], { [styles.active]: open })}>
      <div className={styles["cart-list"]}>
        {cart &&
          cart.cartItems.length > 0 &&
          cart.cartItems.map((item) => (
            <div className="flex items-center p-4 gap-4" key={item.id}>
              <div>
                <p className={styles["product-name"]}>{item.book.name}</p>
                <p className="font-bold">{`${item.quantity} x ฿ ${parseInt(item.book.price).toFixed(2)}`}</p>
              </div>

              <img src={item.book.image} alt={item.book.name} crossOrigin="anonymous" />
              <i className="fa-solid fa-trash text-gray-400 cursor-pointer" onClick={() => removeItem(item.id)} />
            </div>
          ))}
      </div>

      <p className="text-center font-bold py-6">ราคารวม : ฿ {totalPrice.toFixed(2)}</p>

      <Link className="block px-4" to="/user/cart" onClick={handleCartPopup}>
        <Button className="w-full mb-6">ดูรถเข็น ({cart?.cartItems.length || 0})</Button>
      </Link>
    </div>
  );
};

export default memo(CartPopup);
