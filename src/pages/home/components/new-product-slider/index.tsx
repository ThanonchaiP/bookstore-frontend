import { memo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getNewProduct } from "services/product.service";
import ProductSlider from "../product-slider";
import styles from "../best-seller-slider/index.module.scss";

const NewProductSlider = () => {
  const { t } = useTranslation();
  const { data } = getNewProduct({ page: 1, limit: 10 });

  return (
    <div className={styles.container}>
      <div className="grid grid-cols-2 items-center justify-between sm:grid-cols-3 sm:justify-center  mb-9">
        <div className="hidden sm:block"></div>
        <h1 className="text-xl md:text-3xl font-semibold">{t("newProduct")}</h1>
        <div className="text-right">
          <Link to="/new-product">
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

export default memo(NewProductSlider);
