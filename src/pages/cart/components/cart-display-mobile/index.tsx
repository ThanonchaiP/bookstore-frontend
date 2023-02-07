import { memo } from "react";
import classnames from "classnames";
import { Cart, CartItem } from "@/models/cart";
import { FormCheckbox } from "components/form/checkbox";
import { useAppDispatch, useAppSelector } from "store/configureStore";
import { removeCartItemAsync, removeSelectItem, setSelected, updateCartItemAsync } from "store/slice/cartSlice";

type Props = {
  cart: Cart;
};

const CartDisplayMobile = ({ cart }: Props) => {
  const dispatch = useAppDispatch();

  const { selected } = useAppSelector((state) => state.cart);

  const onSelect = (checked: boolean, product: CartItem) => {
    if (checked) dispatch(setSelected([...selected, product]));
    else dispatch(removeSelectItem(product));
  };

  const onChange = (value: string, product: CartItem) => {
    if (!value) return;

    const data = parseInt(value);
    const qty = data < 1 ? 1 : data > product.book.quantity ? product.book.quantity : data;
    dispatch(updateCartItemAsync({ cartItemId: product.id, quantity: qty }));
  };

  const increment = (product: CartItem) => {
    dispatch(updateCartItemAsync({ cartItemId: product.id, quantity: product.quantity + 1 }));
  };

  const decrement = (product: CartItem) => {
    if (product.quantity === 1) return;
    dispatch(updateCartItemAsync({ cartItemId: product.id, quantity: product.quantity - 1 }));
  };

  const removeItem = (product: CartItem) => dispatch(removeCartItemAsync({ cartItemId: product.id }));

  return (
    <div className="flex flex-col gap-4">
      {cart.cartItems.map((item) => (
        <div key={item.id} className="pb-4 border-b-2 border-gray-300">
          <div className="flex items-center">
            <FormCheckbox
              checked={selected.find((i) => i.id === item.id) ? true : false}
              onChange={(e) => onSelect(e.target.checked, item)}
            />
            <img className="max-w-[65px] mx-4" src={item.book.image} alt={item.book.name} crossOrigin="anonymous" />

            <div className="self-start">
              <h4 className="text-base font-medium mb-2">{item.book.name}</h4>
              <p className="flex items-center justify-center rounded-[4px] w-[64px] h-[16px] text-white text-xs bg-[#554994]">
                Book
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between my-4">
            <div>
              <p className="text-xs">ราคาต่อหน่วย</p>
              <h5 className="text-base font-bold">฿ {item.book.price}</h5>
            </div>

            <div className="flex items-center gap-2">
              <i
                className={classnames("fa-solid fa-square-minus text-3xl text-gray-400 cursor-pointer", {
                  "pointer-events-none text-gray-200": item.quantity === 1,
                })}
                onClick={() => decrement(item)}
              />
              <input
                type="number"
                className="w-[60px] h-[32px] outline-none border-2 border-gray-200 text-center"
                value={item.quantity}
                onChange={(e) => {
                  onChange(e.target.value, item);
                }}
              />
              <i
                className="fa-solid fa-square-plus text-3xl text-gray-400 cursor-pointer"
                onClick={() => increment(item)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p>ราคารวม</p>
            <h4 className="text-[#554994] font-bold">฿ {(item.quantity * +item.book.price).toFixed(2)}</h4>
          </div>

          <div className="flex justify-end">
            <i className="fa-solid fa-trash text-lg text-gray-400 cursor-pointer" onClick={() => removeItem(item)} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(CartDisplayMobile);
