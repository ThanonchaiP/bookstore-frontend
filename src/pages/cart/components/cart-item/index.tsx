import classnames from "classnames";
import { ChangeEvent, memo } from "react";
import { CartItem as ICartItem } from "@/models/cart";
import { FormCheckbox } from "components/form/checkbox";
import { Link } from "react-router-dom";
import { removeCartItemAsync, removeSelectItem, setSelected, updateCartItemAsync } from "store/slice/cartSlice";
import { useAppDispatch, useAppSelector } from "store/configureStore";
import styled from "./index.module.scss";

type Props = {
  item: ICartItem;
};

const CartItem = ({ item }: Props) => {
  const dispatch = useAppDispatch();

  const { selected } = useAppSelector((state) => state.cart);

  const onChange = (value: string) => {
    if (!value) return;

    const data = parseInt(value);
    const qty = data < 1 ? 1 : data > item.book.quantity ? item.book.quantity : data;
    dispatch(updateCartItemAsync({ cartItemId: item.id, quantity: qty }));
  };

  const increment = () => {
    dispatch(updateCartItemAsync({ cartItemId: item.id, quantity: item.quantity + 1 }));
  };

  const decrement = () => {
    if (item.quantity === 1) return;
    dispatch(updateCartItemAsync({ cartItemId: item.id, quantity: item.quantity - 1 }));
  };

  const removeItem = () => dispatch(removeCartItemAsync({ cartItemId: item.id }));

  const onSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    if (checked) dispatch(setSelected([...selected, item]));
    else dispatch(removeSelectItem(item));
  };

  return (
    <tr>
      <td>
        <FormCheckbox checked={selected.find((i) => i.id === item.id) ? true : false} onChange={onSelect} />
      </td>

      <td>
        <div className={styled["product-image"]}>
          <img src={item.book.image} alt={item.book.name} crossOrigin="anonymous" />
        </div>
      </td>

      <td>
        <Link to={`/product-detail/${item.book.id}`}>
          <p className={styled["product-name"]}>{item.book.name}</p>
        </Link>
        <p className={styled["product-author"]}>{item.book.author.name}</p>
        <div className={styled.tag}>Book</div>
        <p className="text-xs mt-1">Quantity : {item.book.quantity}</p>
      </td>

      <td className="text-center">
        <p className="text-sm font-bold text-[#999899]">
          <i className="fa-solid fa-baht-sign mr-1" />
          {item.book.price}
        </p>
      </td>

      <td className="text-center">
        <div className="flex items-center gap-1">
          <i
            className={classnames("fa-solid fa-square-minus text-xl text-gray-400 cursor-pointer", {
              "pointer-events-none text-gray-200": item.quantity === 1,
            })}
            onClick={decrement}
          />
          <input
            type="number"
            className={styled["quantity-field"]}
            value={item.quantity}
            onChange={(e) => onChange(e.target.value)}
          />
          <i className="fa-solid fa-square-plus text-xl text-gray-400 cursor-pointer" onClick={increment} />
        </div>
      </td>

      <td className="text-right">
        <p className="font-bold text-[#554994]">
          <i className="fa-solid fa-baht-sign mr-1" />
          {(item.quantity * +item.book.price).toFixed(2)}
        </p>
      </td>

      <td className="text-center">
        <i className="fa-solid fa-trash text-gray-400 cursor-pointer" onClick={removeItem} />
      </td>
    </tr>
  );
};

export default memo(CartItem);
