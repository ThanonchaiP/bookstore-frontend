import ProductCard from "../../components/product-card";
import { Meta } from "models/meta";
import { Product } from "models/product";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { bestSeller } from "../../services/product.service";
import styled from "./index.module.scss";
import Pagination from "../../components/pagination";

const BestSeller = () => {
  const { t } = useTranslation();

  const [meta, setMeta] = useState<Meta>({});
  const [data, setData] = useState<Product[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });

  const onPageChange = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  useEffect(() => {
    const loadData = async () => {
      let params = { page: pagination.page, limit: pagination.limit };
      const result = await bestSeller(params);
      setMeta(result.meta);
      setData(result.data);
      window.scroll(0, 0);
    };

    loadData();
  }, [pagination]);

  return (
    <div className={styled.container}>
      <h1>{t("bestSeller")}</h1>

      <div className={`grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-4 ${styled["grid-container"]}`}>
        {data.length > 0 && data.map((item) => <ProductCard key={item.id} data={item} />)}
      </div>

      <div className="flex justify-end my-6">
        <Pagination
          currentPage={pagination.page}
          pageSize={pagination.limit}
          totalCount={meta.itemCount || 0}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default BestSeller;
