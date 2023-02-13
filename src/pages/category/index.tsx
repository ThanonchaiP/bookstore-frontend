import { useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { selectFilterState } from "store/slice/filterSlice";
import { useAppSelector } from "store/configureStore";
import { CategoryProduct } from "@/models/category";
import { getCategoryById } from "@/services/category.service";
import { Meta } from "@/models/meta";
import Pagination from "components/pagination";
import ProductCard from "components/product-card";
import Sortbar from "components/sortbar";
import styles from "./index.module.scss";

const Category = () => {
  const { id } = useParams();

  let [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || "";

  const { sort } = useAppSelector(selectFilterState);
  const [data, setData] = useState<CategoryProduct>();
  const [pagination, setPagination] = useState({ page: page ? +page : 1, limit: 15 });
  const [meta, setMeta] = useState<Meta>({});

  const onPageChange = useCallback((page: number) => {
    setSearchParams({ page: page.toString() });
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const params = { ...pagination, sort };
      const result = await getCategoryById(id!, params);
      setData(result.data);
      setMeta(result.meta);
    };

    loadData();
  }, [id, sort, pagination]);

  return (
    <div className={styles.category}>
      {data && data.category && (
        <>
          <h1 className={styles.category__header}>{data.category.name}</h1>

          <div className="flex justify-end mt-3 mb-6">
            <Sortbar disableDisplayIcon />
          </div>

          <div className={`grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-4 ${styles["grid-container"]}`}>
            {data.book.map((item) => (
              <ProductCard key={item.id} data={item} />
            ))}
          </div>

          <div className="flex justify-end my-6">
            <Pagination
              currentPage={pagination.page || 1}
              pageSize={pagination.limit}
              totalCount={meta.itemCount || 0}
              onPageChange={onPageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Category;
