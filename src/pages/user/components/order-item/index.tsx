import { memo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { OrderItem as IOrderItem } from "@/models/order";
import styles from "./index.module.scss";

type Props = {
  item: IOrderItem;
  onOpenPopup: (value: IOrderItem) => void;
};

const OrderItem = ({ item, onOpenPopup }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={styles["item-container"]} key={item.id}>
      <div className={styles["product-img"]}>
        <img src={item.book.image} alt={item.book.name} crossOrigin="anonymous" />
      </div>

      <div className="flex-1">
        <Link to={`/product-detail/${item.book.id}`} className="text-base font-medium">
          {item.book.name}
        </Link>
        <p>
          {t("order.quantity")}: {item.quantity}
        </p>

        <p>
          {t("order.price")}: ฿{(+item.book.price).toFixed(2)}
        </p>

        <div className="flex flex-col justify-between md:flex-row md:items-center">
          <p className="text-[#1a9cb7] cursor-pointer hover:underline" onClick={() => onOpenPopup(item)}>
            {item.review ? "แก้ไขคะแนนสินค้า" : "ให้คะแนนสินค้า"}
          </p>
          <h4 className="text-base font-semibold text-[#554994] mt-2 md:mt-0">
            ฿{(item.quantity * Number(item.book.price)).toFixed(2)}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default memo(OrderItem);
