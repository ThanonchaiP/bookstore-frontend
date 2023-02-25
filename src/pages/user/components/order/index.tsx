import moment from "moment";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { getOrders } from "@/services/order.service";
import { OrderItem as IOrderItem } from "@/models/order";
import Pagination from "components/pagination";
import ReviewPopup from "../review-popup";
import OrderItem from "../order-item";
import styles from "./index.module.scss";
import "moment/dist/locale/th";

const Order = () => {
  const { t } = useTranslation();
  let [searchParams, setSearchParams] = useSearchParams();
  const [openPopup, setOpenPopup] = useState(false);
  const [itemReview, setItemReview] = useState<IOrderItem>();

  const page = searchParams.get("page") || "1";
  const { data, mutate } = getOrders(+page);

  const onPageChange = useCallback((page: number) => {
    setSearchParams({ page: page.toString() });
  }, []);

  const onOpenPopup = useCallback((item: IOrderItem) => {
    setItemReview(item);
    setOpenPopup(true);
  }, []);

  const onClosePopup = useCallback((created?: boolean) => {
    if (created) mutate();
    setItemReview(undefined);
    setOpenPopup(false);
  }, []);

  return (
    <div className="p-4 rounded-md shadow-lg">
      <h1 className="text-lg font-medium mb-8">{t("order.myOrder")}</h1>

      {data && (
        <>
          {data.data.map((order) => (
            <div className={styles["order-item"]} key={order.id}>
              <div className={styles["order-item__header"]}>
                <div>
                  <h4 className="font-medium md:text-base">
                    {t("order.order")} <span className="text-[#554994]">#{order.orderId}</span>
                  </h4>
                  <h4 className="font-medium md:text-base">
                    {t("order.orderDate")} {moment(order.orderDate).locale("th").format("DD MMMM YYYY เวลา HH:mm")}
                  </h4>
                </div>

                <h4 className="font-medium md:text-base">
                  {t("order.orderTotal")}: <span className="text-lg text-[#554994]">฿{order.totalPrice}</span>
                </h4>
              </div>

              {order.orderItems.map((item) => (
                <OrderItem key={item.id} item={item} onOpenPopup={onOpenPopup} />
              ))}
            </div>
          ))}

          <Pagination
            className="justify-end py-4"
            currentPage={data.meta.page || 1}
            pageSize={data.meta.limit}
            totalCount={data.meta.itemCount || 0}
            onPageChange={onPageChange}
          />
        </>
      )}

      {itemReview && <ReviewPopup open={openPopup} item={itemReview} handleClose={onClosePopup} />}
    </div>
  );
};

export default Order;
