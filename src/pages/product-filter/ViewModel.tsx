import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getProducts } from "services/product.service";
import { useAppDispatch, useAppSelector } from "store/configureStore";
import { Display, resetFilter, selectFilterState } from "store/slice/filterSlice";
import { Product } from "models/product";
import { Meta } from "models/meta";
import useMediaQuery from "utils/hooks/useMediaQuery";

export function useSearchViewModel() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const filterState = useAppSelector(selectFilterState);
  const [searchParams] = useSearchParams();

  const keyword = useMemo(() => searchParams.get("keyword") || "", [searchParams]);
  const keywordText = keyword && `"${keyword}"`;

  const [data, setData] = useState<Product[]>([]);
  const [meta, setMeta] = useState<Meta>({});
  const [display, setDisplay] = useState(Display.Column);
  const [pagination, setPagination] = useState<{ page: number; limit: number }>({ page: 1, limit: 21 });

  const onPageChange = useCallback((page: number) => setPagination((state) => ({ ...state, page })), []);
  const onDisplayChange = useCallback((value: number) => setDisplay(value), []);

  useEffect(() => {
    if (isMobile && display === Display.List) setDisplay(Display.Column);
  }, [isMobile]);

  useEffect(() => {
    const loadData = async () => {
      let payload = { search: keyword, ...pagination, ...filterState };
      const result = await getProducts(payload);
      setMeta(result.meta);
      setData(result.data);
      window.scroll(0, 0);
    };

    loadData();
  }, [keyword, pagination, filterState]);

  //cleanup
  useEffect(
    () => () => {
      dispatch(resetFilter());
    },
    []
  );

  return { data, pagination, meta, keywordText, display, t, onPageChange, onDisplayChange };
}
