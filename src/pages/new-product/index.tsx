import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { getNewProduct } from "services/product.service";
import ProductCard from "components/product-card";
import Pagination from "components/pagination";
import styles from "../best-seller/index.module.scss";

const NewProduct = () => {
  const { t } = useTranslation();
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const { data } = getNewProduct({ page: pagination.page, limit: pagination.limit });

  const onPageChange = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  return (
    <div className={styles.container}>
      <h1>{t("newProduct")}</h1>

      <div className={`grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-4 ${styles["grid-container"]}`}>
        {data && data.data.map((item) => <ProductCard key={item.id} data={item} />)}
      </div>

      <div className="flex justify-end my-6">
        <Pagination
          currentPage={pagination.page}
          pageSize={pagination.limit}
          totalCount={data?.meta.itemCount || 0}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default NewProduct;
