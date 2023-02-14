import { memo } from "react";
import styles from "./index.module.scss";
import { Cart } from "@/models/cart";
import CartItem from "../cart-item";

type Props = {
  cart: Cart;
};

const CartTable = ({ cart }: Props) => {
  const { cartItems } = cart;

  return (
    <table className={styles.table}>
      <tbody>
        <tr>
          <td />
          <td />
          <td>ชื่อสินค้า</td>
          <td className="text-center">ราคา/หน่วย</td>
          <td className="text-center">จำนวน</td>
          <td className="text-right">ราคารวม</td>
          <td />
        </tr>
        {cartItems.length > 0 && cartItems.map((item) => <CartItem item={item} key={item.id} />)}
      </tbody>
    </table>
  );
};

export default memo(CartTable);
