import Slider from "react-slick";
import { Fragment, memo } from "react";
import { Product } from "models/product";
import ProductCard from "components/product-card";
import { useProductSlider } from "./ViewModel";

type Props = {
  products?: Product[];
};

const ProductSlider = ({ products }: Props) => {
  const { settings } = useProductSlider();

  return (
    <Fragment>
      {products && products.length > 0 && (
        <Slider {...settings}>
          {products.map((product) => (
            <div className="px-2" key={product.id}>
              <ProductCard data={product} />
            </div>
          ))}
        </Slider>
      )}
    </Fragment>
  );
};

export default memo(ProductSlider);
