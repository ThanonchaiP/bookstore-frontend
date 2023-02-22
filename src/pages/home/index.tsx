import CategorySlider from "components/category-menu";
import Banner from "components/banner";
import BestSellerSlider from "./components/best-seller-slider";
import NewProductSlider from "./components/new-product-slider";
import CartoonSlider from "./components/cartoon-slider";
import styles from "./index.module.scss";

function HomePage() {
  return (
    <div className={styles.home}>
      <Banner />
      <CategorySlider />
      <BestSellerSlider />
      <NewProductSlider />
      <CartoonSlider />
    </div>
  );
}

export default HomePage;
