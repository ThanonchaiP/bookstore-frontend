import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Product } from "models/product";
import { Meta } from "models/meta";
import { getProduct } from "../../services/product.service";
import { useAppSelector } from "../../store/configureStore";
import { Display, selectFilterState } from "../../store/slice/filterSlice";
import useMediaQuery from "../../utils/hooks/useMediaQuery";

export function useSearchViewModel() {
  const { t } = useTranslation();
  const { search } = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const filterState = useAppSelector(selectFilterState);

  const keyword = new URLSearchParams(search).get("keyword") || "";
  const keywordText = keyword && `"${keyword}"`;

  const [data, setData] = useState<Product[]>([]);
  const [meta, setMeta] = useState<Meta>({});
  const [display, setDisplay] = useState(Display.Column);
  const [pagination, setPagination] = useState<{ page: number; limit: number }>({ page: 1, limit: 20 });

  const onPageChange = useCallback((page: number) => setPagination((state) => ({ ...state, page })), []);
  const onDisplayChange = useCallback((value: number) => setDisplay(value), []);

  useEffect(() => {
    if (isMobile && display === Display.List) setDisplay(Display.Column);
  }, [isMobile]);

  useEffect(() => {
    const loadData = async () => {
      let payload = { search: keyword, ...pagination, ...filterState };
      const result = await getProduct(payload);
      setMeta(result.meta);
      setData(result.data);
    };

    loadData();
  }, [search, pagination, filterState]);

  return { data, pagination, meta, keywordText, display, t, onPageChange, onDisplayChange };
}
