import { Product } from "models/product";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { newBook } from "services/product.service";
import ProductSlider from "../product-slider";
import styled from "./index.module.scss";

const NewProductSlider = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const result = await newBook({ page: 1, limit: 10 });
      setData(result.data);
    };

    loadData();
  }, []);

  return (
    <div className={styled.container}>
      <div className="grid grid-cols-2 items-center justify-between sm:grid-cols-3 sm:justify-center  mb-9">
        <div className="hidden sm:block"></div>
        <h1 className="text-xl md:text-3xl font-semibold">{t("newProduct")}</h1>
        <div className="text-right">
          <Link to="/new-product">
            <button type="button" className={styled["btn-view"]}>
              {t("viewAll")}
            </button>
          </Link>
        </div>
      </div>

      <ProductSlider products={data} />
    </div>
  );
};

export default memo(NewProductSlider);
