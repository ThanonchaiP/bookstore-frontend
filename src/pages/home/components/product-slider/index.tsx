import Slider from "react-slick";
import { Fragment, memo } from "react";
import { Product } from "models/product";
import { useProductSlider } from "./ViewModel";
import ProductCard from "../../../../components/product-card";

type Props = {
  products?: Product[];
};

const ProductSlider = ({ products }: Props) => {
  const { settings, onClickCard } = useProductSlider();

  return (
    <Fragment>
      {products && products.length > 0 && (
        <Slider {...settings}>
          {products.map((product) => (
            <div className="px-2" key={product.id}>
              <ProductCard data={product} onClick={onClickCard} />
            </div>
          ))}
        </Slider>
      )}
    </Fragment>
  );
};

export default memo(ProductSlider);
