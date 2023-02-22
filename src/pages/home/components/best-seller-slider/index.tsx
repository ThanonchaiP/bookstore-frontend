import { memo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getBestSeller } from "services/product.service";
import ProductSlider from "../product-slider";
import styles from "./index.module.scss";

const BestSellerSlider = () => {
  const { t } = useTranslation();
  const { data } = getBestSeller({ page: 1, limit: 20 });

  return (
    <div className={styles.container}>
      <div className="grid grid-cols-2 items-center justify-between sm:grid-cols-3 sm:justify-center  mb-9">
        <div className="hidden sm:block"></div>
        <h1 className="text-xl md:text-3xl font-semibold">{t("bestSeller")}</h1>
        <div className="text-right">
          <Link to="/best-seller">
            <button type="button" className={styles["btn-view"]}>
              {t("viewAll")}
            </button>
          </Link>
        </div>
      </div>

      {data && <ProductSlider products={data.data} />}
    </div>
  );
};

export default memo(BestSellerSlider);
