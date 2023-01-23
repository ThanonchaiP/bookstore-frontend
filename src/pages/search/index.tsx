import { useSearchViewModel } from "./SearchViewModel";
import styled from "./index.module.scss";
import Filter from "../../components/filter";
import SortBar from "../../components/sortbar";
import Pagination from "../../components/pagination";
import ProductCard from "../../components/product-card";
import { Display } from "../../slice/filterSlice";

function SearchPage() {
  const { data, pagination, meta, keywordText, display, t, onPageChange, onDisplayChange } = useSearchViewModel();

  return (
    <div className={styled.search}>
      <div className={styled.search__filter}>
        <Filter />
      </div>

      <div className={styled.search__content}>
        <div className="flex justify-between items-center mb-6">
          <p className="text-xl">{`${meta.itemCount} ${t("resultsFor")} ${keywordText}`}</p>
          <SortBar display={display} onDisplayChange={onDisplayChange} />
        </div>

        <div className={`grid ${display === Display.Column ? "grid-cols-3" : "grid-cols-1"} gap-x-4 gap-y-9`}>
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

export default SearchPage;
