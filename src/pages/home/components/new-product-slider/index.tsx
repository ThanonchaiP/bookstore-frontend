import { Product } from "models/product";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { newBook } from "../../../../services/product.service";
import ProductSlider from "../product-slider";
import styled from "./index.module.scss";

const NewProductSlider = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const result = await newBook();
      setData(result.data);
    };

    loadData();
  }, []);

  return (
    <div className={styled.container}>
      <h1 className="text-xl md:text-3xl font-semibold mb-9">{t("newProduct")}</h1>

      <ProductSlider products={data} />
    </div>
  );
};

export default memo(NewProductSlider);
