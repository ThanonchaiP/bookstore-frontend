import { ChangeEvent } from "react";
import { Row, Col } from "antd";
import { FormCheckbox } from "components/form/checkbox";
import CartTable from "./components/cart-table";
import CartSummary from "./components/cart-summary";
import { useAppDispatch, useAppSelector } from "store/configureStore";
import { selectCartState, setSelected } from "store/slice/cartSlice";
import { useTranslation } from "react-i18next";
import useMediaQuery from "utils/hooks/useMediaQuery";
import CartDisplayMobile from "./components/cart-display-mobile";
import styles from "./index.module.scss";

const Cart = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { cart, selected } = useAppSelector(selectCartState);

  const onSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    if (!cart || cart.cartItems.length < 1) return;

    if (checked) dispatch(setSelected(cart.cartItems));
    else dispatch(setSelected([]));
  };

  return (
    <div className={styles.container}>
      <Row className="mt-3">
        <Col span={24} xl={16}>
          <div className="flex items-center gap-3 rounded-md shadow-md p-4">
            <FormCheckbox
              onChange={onSelectAll}
              checked={cart?.cartItems.length === selected.length && selected.length > 0}
            />
            <p className="text-base">{`${t("cart.selectAll")} ( ${cart?.cartItems.length || 0} ${t(
              "cart.piece"
            )} )`}</p>
          </div>

          {cart && (
            <div className="mt-4 py-4 pl-4 shadow-md">
              {isMobile ? <CartDisplayMobile cart={cart} /> : <CartTable cart={cart} />}
            </div>
          )}
        </Col>
        <Col span={24} xl={8}>
          <CartSummary />
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
