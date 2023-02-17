import useMediaQuery from "utils/hooks/useMediaQuery";
import Filter from "components/filter";
import SortBar from "components/sortbar";
import Pagination from "components/pagination";
import ProductCard from "components/product-card";
import { Display } from "store/slice/filterSlice";
import { useSearchViewModel } from "./ViewModel";
import styles from "./index.module.scss";

function ProductFilterPage() {
  const isDesktop = useMediaQuery("(min-width: 992px)");
  const { data, pagination, meta, keywordText, display, t, onPageChange, onDisplayChange } = useSearchViewModel();

  return (
    <div className={styles.search}>
      {isDesktop && (
        <div className={styles.search__filter}>
          <Filter />
        </div>
      )}

      <div className={styles.search__content}>
        {!isDesktop && <p className="md:text-xl my-4">{`${meta.itemCount || 0} ${t("resultsFor")} ${keywordText}`}</p>}

        <div className="flex justify-between items-center mb-6 md:mb-8">
          {isDesktop ? <p className="text-xl">{`${meta.itemCount || 0} ${t("resultsFor")} ${keywordText}`}</p> : <Filter />}
          <SortBar display={display} onDisplayChange={onDisplayChange} />
        </div>

        <div
          className={`${styles["product-container"]} grid ${
            display === Display.Column ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1"
          } gap-x-4 gap-y-9`}
        >
          {data.length > 0 &&
            data.map((item) => (
              <ProductCard key={item.id} data={item} display={display === Display.Column ? "column" : "list"} />
            ))}
        </div>

        <Pagination
          className="mt-10 justify-end"
          currentPage={pagination.page}
          pageSize={pagination.limit}
          totalCount={meta.itemCount || 0}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}

export default ProductFilterPage;
