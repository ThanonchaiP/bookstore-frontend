import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Product } from "models/product";
import { bestSeller } from "../../../../services/product.service";
import ProductSlider from "../product-slider";
import styled from "./index.module.scss";

const BestSellerSlider = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const result = await bestSeller();
      setData(result.data);
    };

    loadData();
  }, []);

  return (
    <div className={styled.container}>
      <h1 className="text-xl md:text-2xl font-semibold mb-5">{t("bestSeller")}</h1>

      <ProductSlider products={data} />
    </div>
  );
};

export default memo(BestSellerSlider);
