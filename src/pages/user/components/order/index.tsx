import moment from "moment";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import { getOrders } from "@/services/order.service";
import Pagination from "components/pagination";
import styles from "./index.module.scss";
import "moment/dist/locale/th";

const Order = () => {
  const { t } = useTranslation();
  let [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page") || "1";
  const { data } = getOrders(+page);

  const onPageChange = useCallback((page: number) => {
    setSearchParams({ page: page.toString() });
  }, []);

  return (
    <div className="p-4 rounded-md shadow-lg">
      <h1 className="text-lg font-medium mb-8">{t("order.myOrder")}</h1>

      {data &&
        data.data.map((order) => (
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

                  <div className="flex flex-col justify-between md:flex-row">
                    <p>
                      {t("order.price")}: {(+item.book.price).toFixed(2)}
                    </p>
                    <h4 className="text-base font-semibold text-[#554994] mt-2 md:mt-0">
                      ฿{(item.quantity * Number(item.book.price)).toFixed(2)}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

      {data && data.data.length > 0 && (
        <Pagination
          className="justify-end py-4"
          currentPage={data.meta.page || 1}
          pageSize={data.meta.limit}
          totalCount={data.meta.itemCount || 0}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default Order;
