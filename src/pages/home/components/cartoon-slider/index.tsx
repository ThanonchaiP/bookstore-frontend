import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getCategoryById } from "@/services/category.service";
import { Product } from "@/models/product";
import ProductSlider from "../product-slider";
import styles from "../best-seller-slider/index.module.scss";

const CartoonSlider = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const result = await getCategoryById("5", { limit: 10 });
      setData(result.data.book);
    };
    loadData();
  }, []);

  return (
    <div className={styles.container}>
      <div className="grid grid-cols-2 items-center justify-between sm:grid-cols-3 sm:justify-center  mb-9">
        <div className="hidden sm:block"></div>
        <h1 className="text-xl md:text-3xl font-semibold">{t("cartoon")}</h1>
        <div className="text-right">
          <Link to="/category/5">
            <button type="button" className={styles["btn-view"]}>
              {t("viewAll")}
            </button>
          </Link>
        </div>
      </div>

      {data && <ProductSlider products={data} />}
    </div>
  );
};

export default memo(CartoonSlider);
